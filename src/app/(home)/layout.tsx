"use client";
import Footer from "@/components/layout/Home/Shared/Footer/Footer";
import Navbar from "@/components/layout/Home/Shared/Navbar/Navbar";
import { Popup } from "@/components/layout/Home/Shared/Popup/Popup";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <>
        <div className="min-h-screen bg-white text-dark-slate dark:bg-white dark:text-dark-slate">
          <Popup/>
          <Navbar/>{children}<Footer/>
        </div>
      </>
    </>
  );
}
