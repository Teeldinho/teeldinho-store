"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Squirrel } from "lucide-react";
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

export default function LayoutHeader() {
  return (
    <header className="bg-background/50  border-b dark:border-gray-700 px-4 md:px-6 h-14 flex items-center">
      <Link className="flex items-center gap-2" href="#">
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
          />
        </div>
      </div>

      <Button className="rounded-full" size="icon" variant="ghost">
        <ShoppingBag className="size-6 text-foreground " />
        <span className="sr-only">Cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="ghost">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
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
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Orders</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
