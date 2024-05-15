"use client";

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { formatToRand } from "@/lib/utils";
import { useShopStore } from "@/providers/store-provider";

export default function OrderSummaryTable() {
  const { cart, removeFromCart } = useShopStore((state) => state);

  const handleRemoveProductFromCart = (productId: number) => {
    const productToRemove = cart?.products.find((product) => product.id === productId);
    if (!productToRemove) {
      return;
    }
    removeFromCart(productToRemove.id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {cart ? (
          cart.products.map((product) => (
            <Fragment key={product.id}>
              <TableRow>
                <TableCell className="hidden md:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.thumbnail ?? "/placeholder.svg"}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>
                  <Select defaultValue={product.quantity.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={product.quantity.toString()} disabled>
                        {product.quantity.toString()}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{formatToRand(product.price)}</TableCell>
                <TableCell className="table-cell">
                  <Button size="icon" variant="outline" onClick={() => handleRemoveProductFromCart(product.id)}>
                    <TrashIcon className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          ))
        ) : (
          <p className="min-w-full text-center mx-auto mt-4 text-nowrap">Your cart is empty.</p>
        )}
      </TableBody>
    </Table>
  );
}
