/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CornerUpRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function NavMain({
  label,
  items,
}: {
  label: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const path = usePathname();
  const { theme } = useTheme();

  // Check if any child route matches current path
  const isParentActive = (item: any) => {
    if (item.url === path) return true;
    if (item.items) {
      return item.items.some((subItem: any) => path.startsWith(subItem.url));
    }
    return false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu className="space-y-0.5">
        {items.map((item) => {
          const active = isParentActive(item);

          // If item has no sub-items, render as a simple link
          if (!item.items || item.items.length === 0) {
            const isActive = path === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`cursor-pointer transition-all duration-200 ${
                    isActive
                      ? theme === "dark"
                        ? "bg-blue-900/40 text-[blue-300] border-l-2 border-[#4e73a6]"
                        : "bg-[#ebeff5df] text-lime-500 border-l-2 border-lime-500"
                      : ""
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon  />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // If item has sub-items, render as collapsible
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={active}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`cursor-pointer transition-all duration-200 ${
                      active
                        ? theme === "dark"
                          ? "bg-blue-900/30 text-blue-200"
                          : "bg-lime-500/10 text-lime-700"
                        : ""
                    }`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <CornerUpRight
                      className={`ml-auto ${
                        active
                          ? theme === "dark"
                            ? "text-blue-400"
                            : "text-lime-600"
                          : theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      } transition-all duration-200 group-data-[state=open]/collapsible:rotate-90`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive = path === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`
                              flex items-center gap-1 transition-all duration-200 rounded-sm
                              ${
                                isSubActive
                                  ? theme === "dark"
                                    ? "bg-blue-900/50 text-blue-200 border-l-2 border-blue-400 pl-1"
                                    : "bg-lime-100 text-blue-700 border-l-2 border-lime-500 pl-1"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }
                              ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }
                            `}
                          >
                            <Link
                              href={subItem.url}
                              className="flex items-center gap-1 w-full px-2 py-1"
                            >
                              {subItem.icon && <subItem.icon />}
                              <span className="capitalize">
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}