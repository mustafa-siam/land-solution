/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isLoaded, userId, getToken } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const checkAttempted = useRef(false);

  useEffect(() => {
    const checkAccess = async () => {
      // Prevent double execution in dev mode
      if (checkAttempted.current) return;

      // Wait for Clerk to load
      if (!isLoaded) return;

      // Mark as attempted
      checkAttempted.current = true;

      // If not logged in, redirect immediately
      if (!userId) {
        router.push("/sign-in");
        return;
      }

      try {
        // Get Clerk token
        const token = await getToken();

        if (!token) {
          console.error("❌ Failed to get Clerk token");
          router.push("/sign-in");
          return;
        }

        console.log("🔑 Token received, fetching user role...");

        // Fetch user role from backend
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
          const errorText = await res.text();
          console.error("❌ API Error:", res.status, errorText);

          if (res.status === 401 || res.status === 403) {
            router.push("/sign-in");
            return;
          }

          throw new Error(`API returned ${res.status}: ${errorText}`);
        }

        const data = await res.json();

        const userRole = data?.data?.role || data?.role;

        if (!userRole) {
          console.error("❌ No role found in response");
          setError("User role not found");
          setIsAuthorized(false);
          return;
        }

        // Check if user's role is allowed
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          console.warn(
            `⚠️ Access denied. User role: ${userRole}, Required: ${allowedRoles.join(
              ", "
            )}`
          );
          router.push("/unauthorized");
          setIsAuthorized(false);
        } else {
          console.log("✅ Access granted. Role:", userRole);
          setIsAuthorized(true);
        }
      } catch (error: any) {
        console.error("❌ Role check failed:", error);

        // Check if it's a network error
        if (error.message?.includes("fetch") || error.name === "TypeError") {
          setError(
            "Cannot connect to server. Please ensure the backend is running."
          );
        } else {
          setError(error.message || "An error occurred");
        }

        setIsAuthorized(false);
      }
    };

    checkAccess();
  }, [isLoaded, userId, allowedRoles, getToken, router]); // Only depend on isLoaded and userId

  // Loading state
  if (!isLoaded || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // Error state - show error message instead of redirecting
  if (error && !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Connection Error
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>

          <div className="space-y-3">
            <button
              onClick={() => {
                checkAttempted.current = false;
                setError(null);
                setIsAuthorized(null);
              }}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Retry Connection
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
            >
              Go to Home
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Troubleshooting Steps:
            </p>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
              <li>Check if your backend server is running</li>
              <li>Verify NEXT_PUBLIC_API_URL in .env.local</li>
              <li>Ensure backend is accessible at port 5000</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // If authorized, render children
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Not authorized - shouldn't reach here
  return null;
}
