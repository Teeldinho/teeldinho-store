"use client";

import { Button } from "@/components/ui/button";
import { CartType } from "@/lib/types/carts-types";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  cart: CartType;
};

export default function CartViewProductSummary(cart: Props) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
        <Image
          alt="Product Image"
          className="rounded-md object-cover"
          height="80"
          src="/placeholder.svg"
          style={{
            aspectRatio: "80/80",
            objectFit: "cover",
          }}
          width="80"
        />
        <div className="grid gap-1">
          <h3 className="font-medium">Acme Sunglasses</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">UV Protection</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="text-sm font-medium">2</span>
          <Button size="icon" variant="outline">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
        <div className="text-right font-medium">$49.99</div>
      </div>
    </div>
  );
}
