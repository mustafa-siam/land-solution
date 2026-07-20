"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/images/logo.png";
export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo?: React.ElementType;
    plan: string;
  }[];
}) {
  const activeTeam = teams[0];

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 cursor-pointer gap-3 transition-colors"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-white transition-transform bg-white">
            <Image src={logo} alt="Logo" className="object-cover " />
          </div>
          <Link
            href="/"
            className="grid flex-1 text-left leading-tight min-w-0"
          >
            <span className="truncate font-semibold text-[15px] text-slate-900 dark:text-slate-100">
              {activeTeam.name}
            </span>
            <span className="truncate text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {activeTeam.plan}
            </span>
          </Link>
          {/* <ChevronsUpDown className="ml-auto" /> */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
