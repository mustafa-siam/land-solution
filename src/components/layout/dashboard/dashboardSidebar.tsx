"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "./app-sidebar";
import {
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
  Bell,
  Search,
  Zap,
  CreditCard,
  Keyboard,
  Users,
  LifeBuoy,
  Cloud,
  Plus,
  Home,
  FileText,
  BarChart,
  Clock,
  Calendar,
  Folder,
  Activity,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

// Search data structure
const searchData = {
  pages: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
      description: "View your dashboard overview",
    },
    {
      name: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
      description: "View detailed analytics",
    },
    {
      name: "Documents",
      url: "/dashboard/documents",
      icon: FileText,
      description: "Manage your documents",
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      description: "Configure your preferences",
    },
    {
      name: "Profile",
      url: "/dashboard/profile",
      icon: User,
      description: "Manage your profile",
    },
    {
      name: "Team",
      url: "/dashboard/team",
      icon: Users,
      description: "Manage team members",
    },
    {
      name: "Billing",
      url: "/dashboard/billing",
      icon: CreditCard,
      description: "View billing and plans",
    },
    {
      name: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
      description: "View your calendar",
    },
    {
      name: "Projects",
      url: "/dashboard/projects",
      icon: Folder,
      description: "Manage your projects",
    },
    {
      name: "Activity",
      url: "/dashboard/activity",
      icon: Activity,
      description: "View recent activity",
    },
  ],
  quickActions: [
    { name: "Create New Document", action: "new-document", icon: FileText },
    { name: "Invite Team Member", action: "invite-team", icon: Users },
    { name: "View Reports", action: "view-reports", icon: BarChart },
    { name: "Upload File", action: "upload-file", icon: Cloud },
    { name: "New Project", action: "new-project", icon: Plus },
  ],
  recentSearches: ["Monthly Report", "Team Analytics", "Q4 Documents"],
};

export default function DashboardSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [path2] = path?.split("/")?.slice(2, 3);
  const path3 = path2?.split("-")?.join(" ");
  const { theme, setTheme } = useTheme();
  const [openCommandPalette, setOpenCommandPalette] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  // Command Palette Shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandPalette((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle search navigation
  const handleSelect = (callback: () => void) => {
    setOpenCommandPalette(false);
    callback();
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Handle open profile
  const handleOpenProfile = () => {
    openUserProfile();
  };

  // Filter search results
  const filteredPages = searchQuery
    ? searchData.pages.filter(
        (page) =>
          page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchData.pages;

  const filteredActions = searchQuery
    ? searchData.quickActions.filter((action) =>
        action.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchData.quickActions;

  // Get user initials
  const userInitials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.firstName
    ? user.firstName[0].toUpperCase()
    : "U";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {/* Left Section - Sidebar Trigger & Breadcrumb */}
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground transition-colors capitalize"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                {path3 && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-medium capitalize">
                        {path3}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Center Section - Search Bar (Hidden on mobile) */}
          {/* <div className="hidden lg:flex items-center flex-1 max-w-md">
            <Button
              variant="outline"
              className="relative h-9 w-full justify-start text-sm text-muted-foreground cursor-pointer hover:bg-accent"
              onClick={() => setOpenCommandPalette(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search anything...</span>
              <kbd className="pointer-events-none absolute right-2 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div> */}

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center gap-1 px-4">
            {/* Mobile Search */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden"
              onClick={() => setOpenCommandPalette(true)}
            >
              <Search className="h-4 w-4" />
            </Button> */}

            {/* Quick Actions */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hidden md:flex"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/documents/new")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  New Document
                  <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/team/invite")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Invite Team
                  <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/analytics")}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  View Analytics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Notifications */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 relative"
                >
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] text-white bg-[#1D3E6B]">
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96" align="end">
                <div className="flex items-center justify-between px-4 py-2">
                  <DropdownMenuLabel className="p-0">
                    Notifications
                  </DropdownMenuLabel>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setNotifications(0)}
                  >
                    Mark all as read
                  </Button>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  <DropdownMenuItem className="cursor-pointer flex gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-start justify-between">
                        <span className="font-medium text-sm">
                          New document shared
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          2m
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        John shared Q4 Report.pdf with you
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <Zap className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-start justify-between">
                        <span className="font-medium text-sm">
                          Task completed
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          1h
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Your monthly report has been generated
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-start justify-between">
                        <span className="font-medium text-sm">
                          New team member
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          3h
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Sarah joined your workspace
                      </span>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href="/dashboard/notifications"
                    className="text-center justify-center font-medium"
                  >
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Separator
              orientation="vertical"
              className="h-4 mx-1 hidden md:block"
            />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Profile Dropdown with Clerk Integration */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ml-1"
                >
                  <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-offset-2 ring-offset-background ring-primary/20 hover:ring-primary/40 transition-all">
                    <AvatarImage 
                      src={user?.imageUrl} 
                      alt={user?.firstName || "User"} 
                    />
                    <AvatarFallback className="bg-[#1D3E6B] text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background ring-1 ring-green-500/20"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage 
                        src={user?.imageUrl} 
                        alt={user?.firstName || "User"} 
                      />
                      <AvatarFallback className="bg-[#1D3E6B] text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleOpenProfile}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Update Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Command Palette with Real Search */}
        <CommandDialog
          open={openCommandPalette}
          onOpenChange={setOpenCommandPalette}
        >
          <CommandInput
            placeholder="Type a command or search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No results found for {searchQuery}</CommandEmpty>

            {/* Recent Searches - Show only when no query */}
            {!searchQuery && (
              <CommandGroup heading="Recent Searches">
                {searchData.recentSearches.map((search) => (
                  <CommandItem
                    key={search}
                    onSelect={() => setSearchQuery(search)}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{search}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Pages Navigation */}
            {filteredPages.length > 0 && (
              <>
                {!searchQuery && <CommandSeparator />}
                <CommandGroup heading="Pages">
                  {filteredPages.map((page) => (
                    <CommandItem
                      key={page.url}
                      onSelect={() => handleSelect(() => router.push(page.url))}
                      className="cursor-pointer"
                    >
                      <page.icon className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{page.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {page.description}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Quick Actions */}
            {filteredActions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Quick Actions">
                  {filteredActions.map((action) => (
                    <CommandItem
                      key={action.action}
                      onSelect={() =>
                        handleSelect(() => {
                          console.log(`Executing action: ${action.action}`);
                        })
                      }
                      className="cursor-pointer"
                    >
                      <action.icon className="mr-2 h-4 w-4" />
                      <span>{action.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Settings Shortcuts */}
            {!searchQuery && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem
                    onSelect={() =>
                      handleSelect(() => handleOpenProfile())
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Update Profile</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() =>
                      handleSelect(() => router.push("/dashboard/settings"))
                    }
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Application Settings</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() =>
                      handleSelect(() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      )
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    <span>Toggle Theme</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() =>
                      handleSelect(() => handleSignOut())
                    }
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </CommandDialog>

        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// hello 9oitai