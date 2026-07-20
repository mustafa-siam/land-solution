/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Home,
  Users,
  PlusSquare,
  List,
  LayoutGrid,
  MapPin,
  Package,
  MessageSquare,
  Star,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import useGetRole from "@/hooks/useGetRole";
type CustomTeam = {
  name: string;
  plan: string;
  url?: string; // Add the url property here
  logo?: React.ElementType;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isAdmin = useGetRole();
  let data: {
  teams: CustomTeam[];
  navGroups: any[]; // Or use your specific NavGroup type
};
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  {isAdmin ? 
     data = {
      teams: [
      {
        name: "Land Solution",
        // logo: LayoutDashboard,
        plan: "Admin Dashboard",
        url: "/",
      },
    ],
    navGroups: [
      {
        label: "Gangrel",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            isActive: true,
          },
          {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
            isActive: false,
          },
        ],
      },
      {
        label: "Content",
       items: [
    {
      title: "Popup",
      url: "#",
      icon: LayoutGrid, // UI / layout related
      isActive: false,
      items: [
        // {
        //   title: "Add Popup",
        //   url: "/dashboard/add-popup",
        //   icon: PlusSquare,
        // },
        {
          title: "Manage Popup",
          url: "/dashboard/manage-popup",
          icon: List,
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: LayoutGrid, // grouping / classification
      isActive: false,
      items: [
        {
          title: "Add Category",
          url: "/dashboard/add-category",
          icon: PlusSquare,
        },
        {
          title: "Manage Category",
          url: "/dashboard/manage-category",
          icon: List,
        },
      ],
    },
    {
      title: "Area",
      url: "#",
      icon: MapPin, // location-based
      isActive: false,
      items: [
        {
          title: "Add Area",
          url: "/dashboard/add-area",
          icon: PlusSquare,
        },
        {
          title: "Manage Area",
          url: "/dashboard/manage-area",
          icon: List,
        },
      ],
    },
    {
      title: "Product",
      url: "#",
      icon: Package, // products / items
      isActive: false,
      items: [
        {
          title: "Add Product",
          url: "/dashboard/add-product",
          icon: PlusSquare,
        },
        {
          title: "Manage Product",
          url: "/dashboard/manage-product",
          icon: List,
        },
        {
          title: "Manage User Product",
          url: "/dashboard/manage-user-product",
          icon: List,
        },
      ],
    },
    {
      title: "Property Request",
      url: "#",
      icon: MessageSquare, // messages / inquiries
      isActive: false,
      items: [
        {
          title: "Manage Property Request",
          url: "/dashboard/manage-contact-for-product",
          icon: List,
        },
      ],
    },
    {
      title: "Review",
      url: "#",
      icon: Star, // ratings & reviews
      isActive: false,
      items: [
        {
          title: "Add Review",
          url: "/dashboard/add-review",
          icon: PlusSquare,
        },
        {
          title: "Manage Review",
          url: "/dashboard/manage-review",
          icon: List,
        },
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: FileText, // articles / content
      isActive: false,
      items: [
        {
          title: "Add Blog",
          url: "/dashboard/add-blog",
          icon: PlusSquare,
        },
        {
          title: "Manage Blog",
          url: "/dashboard/manage-blog",
          icon: List,
        },
      ],
    },
  ],
  
      },
    ],
  }
  :
  data = {
    teams: [
      {
        name: "Land Solution",
        // logo: LayoutDashboard,
        plan: "User Dashboard",
        url: "/",
      },
    ],
    navGroups: [
      {
        label: "Content",
       items: [
    {
      title: "Product",
      url: "#",
      icon: Package, // products / items
      isActive: false,
      items: [
        {
          title: "Add Product",
          url: "/user-dashboard/add-product-for-user",
          icon: PlusSquare,
        },
        {
          title: "Manage Product",
          url: "/user-dashboard/manage-product-for-user",
          icon: List,
        },
      ],
    },
  ],
  
      },
    ],
  }}
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
