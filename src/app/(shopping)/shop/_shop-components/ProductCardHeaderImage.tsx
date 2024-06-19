import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/lib/types/products-types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: ProductType;
};

export default function ProductCardHeaderImage({ product }: Props) {
  return (
    <Link className="block relative group bg-muted dark:bg-muted/40 rounded-lg" href={`/shop/${product.id}`}>
      <div className="absolute max-h-4 inset-0 mr-2 mt-3 z-10 flex items-center justify-end">
        <Badge variant={"secondary"}>
          <Star className="size-3 mr-1" />
          {product.rating}
        </Badge>
      </div>
      <Image
        alt={`Product ${product.title}`}
        className="w-full h-60 object-cover rounded-md group-hover:scale-105 transition-all"
        height={400}
        src={product.images?.at(0) ?? ""}
        style={{
          aspectRatio: "400/400",
          objectFit: "fill",
        }}
        width={400}
      />
    </Link>
  );
}
