"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Squirrel } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import dpImage from "../../../../../public/dp.jpg";
import { ReactElement } from "react";
import { logoutIronSession } from "@/lib/sessions/iron-session";
import CartViewDrawer from "./CartViewDrawer";
import { useRouter } from "next/navigation";
import { ThemeModeToggle } from "@/components/reusable-components/ThemeModeToggle";

export default function LayoutHeader({ children }: { children?: ReactElement }) {
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login");
    await logoutIronSession();
  };
  return (
    <header className="bg-card border-b px-4 md:px-6 h-16 flex items-center min-w-full sticky top-0 z-50 gap-2">
      <Link className="flex items-center gap-2" href="/shop">
        <Squirrel className="size-6 text-foreground " />
        <span className="font-semibold text-foreground ">Teeldinho</span>
      </Link>

      <div className="flex-1 mx-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input
            className="w-full  bg-background/50 shadow-none appearance-none pl-8 pr-4 py-2 rounded-md"
            placeholder="Search products..."
            type="search"
            disabled
          />
        </div>
      </div>

      <ThemeModeToggle />

      <CartViewDrawer />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="ghost">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={dpImage}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Settings</DropdownMenuItem>
          <DropdownMenuItem disabled>Orders</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
