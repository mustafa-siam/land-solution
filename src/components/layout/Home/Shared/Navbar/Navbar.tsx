"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Heart } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={navBgClass}>
      <div className="px-[5%]">
        <div className="max-w-screen-xl mx-auto py-5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              width={160}
              height={40}
              src="/images/logo.svg"
              alt="logo"
              className={`h-7 md:h-8 w-fit transition-all ${
                isHome ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? activeLinkClass : textMutedClass
                }`}
              >
                {link.label}
              </Link>
            ))}

            {shouldShowAdminDashboard && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive("/dashboard") ? activeLinkClass : textMutedClass
                }`}
              >
                Dashboard
              </Link>
            )}

            {shouldShowUserDashboard && (
              <Link
                href="/user-dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive("/user-dashboard") ? activeLinkClass : textMutedClass
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/saved"
              className={`${textColorClass} hover:text-[#800020] transition-colors`}
              aria-label="Saved Items"
            >
              <Heart size={20} />
            </Link>

            {needLogin ? (
              <span className={`text-sm font-medium ${textColorClass}`}>
                <Link href="/sign-in" className="hover:text-[#800020] transition-colors">
                  Sign In
                </Link>
                <span className="mx-1.5 opacity-60">/</span>
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

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4 relative z-50">
            <Link href="/saved" className={`${textColorClass} hover:text-[#800020] transition-colors`}>
              <Heart size={20} />
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
        className={`absolute top-full left-0 w-full bg-white shadow-lg z-40 border-t border-gray-100 ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        } transition-all duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col space-y-4 py-6 px-6 text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-[#800020] font-semibold"
                  : "text-gray-600 hover:text-[#800020]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {shouldShowAdminDashboard && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-[#800020] font-semibold"
                  : "text-gray-600 hover:text-[#800020]"
              }`}
            >
              Dashboard
            </Link>
          )}

          {shouldShowUserDashboard && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/user-dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/user-dashboard")
                  ? "text-[#800020] font-semibold"
                  : "text-gray-600 hover:text-[#800020]"
              }`}
            >
              Dashboard
            </Link>
          )}

          {needLogin && (
            <div className="flex gap-4 pt-3 border-t border-gray-100 text-sm font-medium">
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