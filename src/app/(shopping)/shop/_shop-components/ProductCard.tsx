import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types/products-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className=" bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link className="block" href="#">
        <Image
          alt="Product 1"
          className="w-full h-60 object-cover"
          height={400}
          src={product.images?.at(0) ?? ""}
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
          width={400}
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-foreground  mb-2">
          <Link href={`/shop/${product.id}`} className="hover:text-foreground dark:text-gray-50 dark:hover:text-gray-50">
            {product.title}
          </Link>
        </h3>
        <p className="text-muted-foreground dark:text-gray-400 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground ">{product.price}</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
