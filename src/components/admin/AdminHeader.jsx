// src/components/admin/AdminHeader.jsx

import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { adminLogout } from "@/services/adminAuthService";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clears the httpOnly "adminToken" cookie on the server
      await adminLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always send the user to the login page
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8">
      {/* Left Section */}
      <div>
        <h2 className="text-xl font-semibold">Administration</h2>

        <p className="text-sm text-muted-foreground">
          AllGeo Solutions Management Panel
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notification Button */}
        <Button type="button" variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Admin Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            type="button"
            className="flex items-center gap-3 rounded-md px-2 py-2 outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium">Administrator</p>

              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={8}
            className="w-52"
          >
            {/*
              FIX: In Base UI, <DropdownMenuLabel> (Menu.GroupLabel) must be
              rendered inside a <DropdownMenuGroup> (Menu.Group). Without the
              group wrapper it throws "MenuGroupContext is missing".
            */}
            <DropdownMenuGroup>
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/admin/dashboard")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;