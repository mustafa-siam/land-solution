"use client"
import { useAuth } from "@clerk/nextjs";
import React from "react";


export default function useGetRole() {
    const { isLoaded, userId, getToken } = useAuth();
  
  const [userRole, setUserRole] = React.useState<string | null>(null);
    const roleCheckAttempted = React.useRef(false);
    
    React.useEffect(() => {
      const fetchUserRole = async () => {
        // Prevent double execution in dev mode
        if (roleCheckAttempted.current) return;
  
        // Wait for Clerk to load
        if (!isLoaded) return;
  
        // If not logged in, don't fetch role
        if (!userId) {
          setUserRole(null);
          return;
        }
  
        // Mark as attempted
        roleCheckAttempted.current = true;
  
        try {
          // Get Clerk token
          const token = await getToken();
  
          if (!token) {
            console.error("❌ Failed to get Clerk token");
            setUserRole(null);
            return;
          }
  
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
            console.error("❌ API Error:", res.status);
            setUserRole(null);
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
  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error("❌ Role fetch failed:", error);
          setUserRole(null);
        }
      };
  
      fetchUserRole();
    }, [isLoaded, userId, getToken]);
    
  return userRole === "admin";
   
}
