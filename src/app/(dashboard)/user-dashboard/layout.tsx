"use client";

import ProtectedRoute from "@/components/access/ProtectedRoute";
import DashboardSidebar from "@/components/layout/dashboard/dashboardSidebar";
import { ProgressBarProvider } from "@/components/providers/progress-bar-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProgressBarProvider>
      <ProtectedRoute allowedRoles={["user"]}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <DashboardSidebar>{children}</DashboardSidebar>
        </div>
      </ProtectedRoute>
    </ProgressBarProvider>
  );
}
