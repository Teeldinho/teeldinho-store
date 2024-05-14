"use client";

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartProductType, CartType } from "@/lib/types/carts-types";
import { Fragment } from "react";
import { formatToRand } from "@/lib/utils";
import { useShopStore } from "@/providers/store-provider";

type Prop = {
  cart: CartType;
};

export default function OrderSummaryTable(cart: Prop) {
  const { removeFromCart } = useShopStore((state) => state);
  const { cart: cartInQuestion } = cart;

  const handleRemoveProductFromCart = (productId: number) => {
    const productToRemove = cartInQuestion?.products.find((product) => product.id === productId);

    if (!productToRemove) {
      return;
    }

    const product: CartProductType = {
      id: productToRemove.id,
      quantity: productToRemove.quantity,
    };

    removeFromCart(product);
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
        {cartInQuestion?.products.map((product) => (
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
                <Select defaultValue="1">
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
              <TableCell className="hidden md:table-cell">
                <Button size="icon" variant="outline" onClick={() => handleRemoveProductFromCart(product.id)}>
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
