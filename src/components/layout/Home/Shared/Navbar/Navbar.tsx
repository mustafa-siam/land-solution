"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { FiMenu, FiX } from "react-icons/fi";
import { Heart, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isLoaded, userId, getToken } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  const isHome = pathname === "/";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * Detect homepage scroll position.
   * Navbar remains transparent at the top and becomes white after scrolling.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Close mobile navigation when route changes.
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSubmenuOpen(false);
  }, [pathname]);

  /**
   * Fetch authenticated user's role.
   */
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
          console.error("Failed to get Clerk token");
          setUserRole(null);
          return;
        }

        const response = await fetch(
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

        if (!response.ok) {
          console.error("User role API error:", response.status);
          setUserRole(null);
          return;
        }

        const data = await response.json();
        const role = data?.data?.role || data?.role;

        setUserRole(role || null);
      } catch (error) {
        console.error("User role fetch failed:", error);
        setUserRole(null);
      } finally {
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

  /**
   * Transparent theme is used only on the homepage before scrolling.
   */
  const useTransparentTheme = isHome && !isScrolled;

  const navBgClass = isHome
    ? `fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${isScrolled
      ? "border-gray-100 bg-white text-gray-900 shadow-sm"
      : "border-transparent bg-transparent text-white"
    }`
    : "sticky top-0 left-0 z-50 w-full border-b border-gray-100 bg-white text-gray-900 shadow-sm";

  const textColorClass = useTransparentTheme
    ? "text-white transition-colors duration-300"
    : "text-gray-900 transition-colors duration-300";

  const textMutedClass = useTransparentTheme
    ? "text-white/80 hover:text-white transition-colors duration-300"
    : "text-gray-600 hover:text-[#800020] transition-colors duration-300";

  const activeLinkClass = useTransparentTheme
    ? "font-semibold text-white underline decoration-2 decoration-[#800020] underline-offset-8 transition-colors duration-300"
    : "font-semibold text-[#800020] underline decoration-2 decoration-[#800020] underline-offset-8 transition-colors duration-300";

  const primaryNavLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/properties",
      label: "Properties",
    },
  ];

  const submenuLinks = [
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/blogs",
      label: "Blogs",
    },
    {
      href: "/testimonials",
      label: "Testimonials",
    },
  ];

  const isSubmenuActive = submenuLinks.some((link) =>
    isActive(link.href)
  );

  return (
    <nav className={navBgClass}>
      <div className="px-[5%]">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              width={200}
              height={200}
              src={
                useTransparentTheme
                  ? "/images/urbankeyslogo2.png"
                  : "/images/urbankeyslogo4.png"
              }
              alt="Urban Keys"
              priority
              className="h-10 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors md:text-lg ${isActive(link.href)
                  ? activeLinkClass
                  : textMutedClass
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Company Dropdown */}
            <div className="group relative py-2">
              <button
                type="button"
                className={`flex cursor-pointer items-center gap-1 text-base font-medium transition-colors md:text-lg ${isSubmenuActive
                  ? activeLinkClass
                  : textMutedClass
                  }`}
              >
                <span>Company</span>

                <ChevronDown
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute left-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 text-gray-800 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {submenuLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={`block rounded-lg px-4 py-2.5 text-base font-medium transition-all md:text-lg ${isActive(subLink.href)
                      ? "bg-gray-100 font-semibold text-[#800020]"
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
              className={`text-base font-medium transition-colors md:text-lg ${isActive("/contact")
                ? activeLinkClass
                : textMutedClass
                }`}
            >
              Contact
            </Link>

            {shouldShowAdminDashboard && (
              <Link
                href="/dashboard"
                className={`text-base font-medium transition-colors md:text-lg ${isActive("/dashboard")
                  ? activeLinkClass
                  : textMutedClass
                  }`}
              >
                Dashboard
              </Link>
            )}

            {shouldShowUserDashboard && (
              <Link
                href="/user-dashboard"
                className={`text-base font-medium transition-colors md:text-lg ${isActive("/user-dashboard")
                  ? activeLinkClass
                  : textMutedClass
                  }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/saved"
              className={`${textColorClass} transition-colors hover:text-[#800020]`}
              aria-label="Saved Items"
            >
              <Heart size={22} />
            </Link>

            {needLogin ? (
              <div
                className={`text-base font-medium md:text-lg ${textColorClass}`}
              >
                <Link
                  href="/sign-in"
                  className="transition-colors hover:text-[#800020]"
                >
                  Sign In
                </Link>

                <span className="mx-2 opacity-60">/</span>

                <Link
                  href="/sign-up"
                  className="transition-colors hover:text-[#800020]"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="relative z-50 flex items-center gap-4 lg:hidden">
            <Link
              href="/saved"
              className={`${textColorClass} transition-colors hover:text-[#800020]`}
              aria-label="Saved Items"
            >
              <Heart size={22} />
            </Link>

            {!needLogin && <UserButton afterSignOutUrl="/" />}

            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`text-2xl ${textColorClass} focus:outline-none`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`absolute left-0 top-full z-40 w-full border-t border-gray-100 bg-white shadow-lg transition-all duration-300 ease-in-out lg:hidden ${isMobileMenuOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
          }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-6 text-gray-800">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors md:text-lg ${isActive(link.href)
                ? "font-semibold text-[#800020]"
                : "text-gray-700 hover:text-[#800020]"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Company Accordion */}
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() =>
                setIsMobileSubmenuOpen((prev) => !prev)
              }
              className="flex items-center justify-between text-base font-medium text-gray-700 transition-colors hover:text-[#800020] md:text-lg"
              aria-expanded={isMobileSubmenuOpen}
            >
              <span>Company</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${isMobileSubmenuOpen
                  ? "rotate-180 text-[#800020]"
                  : ""
                  }`}
              />
            </button>

            {isMobileSubmenuOpen && (
              <div className="flex flex-col space-y-3 border-l-2 border-gray-200 pl-4 pt-1">
                {submenuLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileSubmenuOpen(false);
                    }}
                    className={`text-base font-medium transition-colors ${isActive(subLink.href)
                      ? "font-semibold text-[#800020]"
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
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-base font-medium transition-colors md:text-lg ${isActive("/contact")
              ? "font-semibold text-[#800020]"
              : "text-gray-700 hover:text-[#800020]"
              }`}
          >
            Contact
          </Link>

          {shouldShowAdminDashboard && (
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors md:text-lg ${isActive("/dashboard")
                ? "font-semibold text-[#800020]"
                : "text-gray-700 hover:text-[#800020]"
                }`}
            >
              Dashboard
            </Link>
          )}

          {shouldShowUserDashboard && (
            <Link
              href="/user-dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors md:text-lg ${isActive("/user-dashboard")
                ? "font-semibold text-[#800020]"
                : "text-gray-700 hover:text-[#800020]"
                }`}
            >
              Dashboard
            </Link>
          )}

          {needLogin && (
            <div className="flex gap-4 border-t border-gray-100 pt-3 text-base font-medium md:text-lg">
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 transition-colors hover:text-[#800020]"
              >
                Sign In
              </Link>

              <span className="text-gray-300">|</span>

              <Link
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-[#800020] hover:underline"
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