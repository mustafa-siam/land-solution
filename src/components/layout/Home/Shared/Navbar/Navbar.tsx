"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Heart, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, userId, getToken } = useAuth();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Dynamic homepage check
  const isHome = pathname === "/";

  // Dynamic theme variables based on page route
  const navBgClass = isHome
    ? "absolute top-0 left-0 w-full z-50 bg-transparent text-white"
    : "sticky top-0 left-0 w-full z-50 bg-white text-gray-900 border-b border-gray-100 shadow-sm";

  const textColorClass = isHome ? "text-white" : "text-gray-900";
  const textMutedClass = isHome ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-[#800020]";

  const activeLinkClass = isHome
    ? "text-white font-semibold underline underline-offset-8 decoration-[#800020] decoration-2"
    : "text-[#800020] font-semibold underline underline-offset-8 decoration-[#800020] decoration-2";

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isLoaded) return;

      if (!userId) {
        setUserRole(null);
        return;
      }

      setIsLoadingRole(true);

      try {
        const token = await getToken();

        if (!token) {
          console.error("❌ Failed to get Clerk token");
          setUserRole(null);
          setIsLoadingRole(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/role`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.error("❌ API Error:", res.status);
          setUserRole(null);
          setIsLoadingRole(false);
          return;
        }

        const data = await res.json();
        const role = data?.data?.role || data?.role;

        if (role) {
          setUserRole(role);
        } else {
          setUserRole(null);
        }

        setIsLoadingRole(false);
      } catch (error) {
        console.error("❌ Role fetch failed:", error);
        setUserRole(null);
        setIsLoadingRole(false);
      }
    };

    fetchUserRole();
  }, [isLoaded, userId, getToken]);

  const isActive = (path: string) => pathname === path;

  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";
  const needLogin = !userId;

  const shouldShowAdminDashboard =
    isLoaded && userId && !isLoadingRole && isAdmin;
  const shouldShowUserDashboard =
    isLoaded && userId && !isLoadingRole && isUser;

  const primaryNavLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
  ];

  const submenuLinks = [
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/testimonials", label: "Testimonials" },
  ];

  const isSubmenuActive = submenuLinks.some((link) => isActive(link.href));

  return (
    <nav className={navBgClass}>
      <div className="px-[5%]">
        <div className="max-w-screen-xl mx-auto py-5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            {
              isHome ? (
                <Image
                  width={160}
                  height={40}
                  src="images/urbanKeyslogo2.png"
                  alt="logo"
                  className={`h-14 md:h-10 w-auto transition-all `}
                />
              ) : (
                <Image
                  width={160}
                  height={40}
                  src="images/urbanKeyslogo4.png"
                  alt="logo"
                  className={`h-14 md:h-10 w-auto transition-all `}
                />
              )
            }

          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base md:text-lg font-medium transition-colors ${isActive(link.href) ? activeLinkClass : textMutedClass
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Submenu (Pages / More) */}
            <div className="relative group py-2">
              <button
                type="button"
                className={`flex items-center gap-1 text-base md:text-lg font-medium cursor-pointer transition-colors ${isSubmenuActive ? activeLinkClass : textMutedClass
                  }`}
              >
                <span>Company</span>
                <ChevronDown size={18} className="transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Submenu Dropdown */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden p-2">
                {submenuLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={`block px-4 py-2.5 rounded-lg text-base md:text-lg font-medium transition-all ${isActive(subLink.href)
                      ? "bg-gray-100 text-[#800020] font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#800020]"
                      }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className={`text-base md:text-lg font-medium transition-colors ${isActive("/contact") ? activeLinkClass : textMutedClass
                }`}
            >
              Contact
            </Link>

            {shouldShowAdminDashboard && (
              <Link
                href="/dashboard"
                className={`text-base md:text-lg font-medium transition-colors ${isActive("/dashboard") ? activeLinkClass : textMutedClass
                  }`}
              >
                Dashboard
              </Link>
            )}

            {shouldShowUserDashboard && (
              <Link
                href="/user-dashboard"
                className={`text-base md:text-lg font-medium transition-colors ${isActive("/user-dashboard") ? activeLinkClass : textMutedClass
                  }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/saved"
              className={`${textColorClass} hover:text-[#800020] transition-colors`}
              aria-label="Saved Items"
            >
              <Heart size={22} />
            </Link>

            {needLogin ? (
              <span className={`text-base md:text-lg font-medium ${textColorClass}`}>
                <Link href="/sign-in" className="hover:text-[#800020] transition-colors">
                  Sign In
                </Link>
                <span className="mx-2 opacity-60">/</span>
                <Link href="/sign-up" className="hover:text-[#800020] transition-colors">
                  Sign Up
                </Link>
              </span>
            ) : (
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>

          {/* Mobile Toggle Controls */}
          <div className="lg:hidden flex items-center gap-4 relative z-50">
            <Link href="/saved" className={`${textColorClass} hover:text-[#800020] transition-colors`}>
              <Heart size={22} />
            </Link>

            {!needLogin && (
              <UserButton afterSignOutUrl="/" />
            )}

            <button
              onClick={toggleMobileMenu}
              className={`text-2xl ${textColorClass} focus:outline-none`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg z-40 border-t border-gray-100 ${isMobileMenuOpen
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-2 opacity-0 pointer-events-none"
          } transition-all duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col space-y-4 py-6 px-6 text-gray-800">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              href={link.href}
              className={`text-base md:text-lg font-medium transition-colors ${isActive(link.href)
                ? "text-[#800020] font-semibold"
                : "text-gray-700 hover:text-[#800020]"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Submenu Accordion */}
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => setIsMobileSubmenuOpen((prev) => !prev)}
              className="flex items-center justify-between text-base md:text-lg font-medium text-gray-700 hover:text-[#800020]"
            >
              <span>Company</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${isMobileSubmenuOpen ? "rotate-180 text-[#800020]" : ""
                  }`}
              />
            </button>

            {isMobileSubmenuOpen && (
              <div className="pl-4 flex flex-col space-y-3 pt-1 border-l-2 border-gray-200">
                {submenuLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    href={subLink.href}
                    className={`text-base font-medium transition-colors ${isActive(subLink.href)
                      ? "text-[#800020] font-semibold"
                      : "text-gray-600 hover:text-[#800020]"
                      }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/contact"
            className={`text-base md:text-lg font-medium transition-colors ${isActive("/contact")
              ? "text-[#800020] font-semibold"
              : "text-gray-700 hover:text-[#800020]"
              }`}
          >
            Contact
          </Link>

          {shouldShowAdminDashboard && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/dashboard"
              className={`text-base md:text-lg font-medium transition-colors ${isActive("/dashboard")
                ? "text-[#800020] font-semibold"
                : "text-gray-700 hover:text-[#800020]"
                }`}
            >
              Dashboard
            </Link>
          )}

          {shouldShowUserDashboard && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/user-dashboard"
              className={`text-base md:text-lg font-medium transition-colors ${isActive("/user-dashboard")
                ? "text-[#800020] font-semibold"
                : "text-gray-700 hover:text-[#800020]"
                }`}
            >
              Dashboard
            </Link>
          )}

          {needLogin && (
            <div className="flex gap-4 pt-3 border-t border-gray-100 text-base md:text-lg font-medium">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/sign-in"
                className="text-gray-800 hover:text-[#800020] transition-colors"
              >
                Sign In
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/sign-up"
                className="text-[#800020] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;