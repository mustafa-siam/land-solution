"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, userId, getToken } = useAuth();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoadingRole, setIsLoadingRole] = useState(false);
  const roleCheckAttempted = useRef(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (roleCheckAttempted.current) return;
      if (!isLoaded) return;

      if (!userId) {
        setUserRole(null);
        return;
      }

      roleCheckAttempted.current = true;
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
          console.log("✅ User role fetched:", role);
          setUserRole(role);
        } else {
          console.error("❌ No role found in response");
          setUserRole(null);
        }

        setIsLoadingRole(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
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
  const needLogin = userRole === null;

  const shouldShowAdminDashboard = isLoaded && userId && !isLoadingRole && isAdmin;
  const shouldShowUserDashboard = isLoaded && userId && !isLoadingRole && isUser;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="px-[5%]">
        <div className="max-w-screen-xl mx-auto py-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              width={160}
              height={40}
              src="/images/logo.svg"
              alt="logo"
              className="h-7 md:h-8 w-fit brightness-0 invert"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:opacity-80 ${
                  isActive(link.href)
                    ? "text-white underline underline-offset-8"
                    : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {shouldShowAdminDashboard && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition hover:opacity-80 ${
                  isActive("/dashboard")
                    ? "text-white underline underline-offset-8"
                    : "text-white/90"
                }`}
              >
                Dashboard
              </Link>
            )}
            {shouldShowUserDashboard && (
              <Link
                href="/user-dashboard"
                className={`text-sm font-medium transition hover:opacity-80 ${
                  isActive("/user-dashboard")
                    ? "text-white underline underline-offset-8"
                    : "text-white/90"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href="/saved" className="text-white hover:opacity-80 transition">
              <Heart size={20} />
            </Link>
            {needLogin && (
              <span className="text-sm font-medium text-white">
                <Link href="/sign-in" className="hover:underline">Sign In</Link>
                <span className="mx-1 text-white/60">/</span>
                <Link href="/sign-up" className="hover:underline">Sign Up</Link>
              </span>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-4 relative z-50">
            <Link href="/saved" className="text-white">
              <Heart size={20} />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-2xl text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg z-40 ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        } transition-all duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col space-y-4 py-6 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              href={link.href}
              className={`hover:underline ${
                isActive(link.href) ? "text-ruby-wine" : "text-ink-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {shouldShowAdminDashboard && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/dashboard"
              className={isActive("/dashboard") ? "text-ruby-wine" : "text-ink-black"}
            >
              Dashboard
            </Link>
          )}
          {shouldShowUserDashboard && (
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/user-dashboard"
              className={isActive("/user-dashboard") ? "text-ruby-wine" : "text-ink-black"}
            >
              Dashboard
            </Link>
          )}

          {needLogin && (
            <div className="flex gap-4">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/sign-in"
                className="text-ink-black hover:underline"
              >
                Sign In
              </Link>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/sign-up"
                className="text-ink-black hover:underline"
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