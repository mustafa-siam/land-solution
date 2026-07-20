"use client";

import { setClerkTokenGetter } from "@/redux/api/baseApi";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

interface ClerkAuthProviderProps {
  children: React.ReactNode;
}

/**
 * Clerk Auth Provider Component
 * Sets up the token getter function for RTK Query to use
 * Must be placed inside ClerkProvider and above Redux Provider
 */
export default function ClerkAuthProvider({
  children,
}: ClerkAuthProviderProps) {
  const { getToken } = useAuth();

  useEffect(() => {
    // Set the token getter function for RTK Query
    setClerkTokenGetter(async () => {
      try {
        const token = await getToken();
        return token;
      } catch (error) {
        console.error("Error getting Clerk token:", error);
        return null;
      }
    });

    // Cleanup on unmount
    return () => {
      setClerkTokenGetter(() => Promise.resolve(null));
    };
  }, [getToken]);

  return <>{children}</>;
}
