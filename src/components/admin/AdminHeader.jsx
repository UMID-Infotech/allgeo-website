import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
      await adminLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-xl font-semibold">
          Administration
        </h2>

        <p className="text-sm text-muted-foreground">
          AllGeo Solutions Management Panel
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto gap-3 px-2 py-2"
            >
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>

              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">
                  Administrator
                </p>

                <p className="text-xs text-muted-foreground">
                  Admin
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52"
          >
            <DropdownMenuLabel>
              Admin Account
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;