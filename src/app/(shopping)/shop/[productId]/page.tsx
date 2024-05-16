import { usingGetProductByIdQuery } from "@/app/_actions/products-actions";
import Image from "next/image";
import { formatToPercentage, formatToRand } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { Suspense } from "react";
import ProductDetailsForm from "./_product-details-components/ProductDetailsForm";

export default async function ProductDetails({ params }: { params: { productId: string } }) {
  const { data: product } = await usingGetProductByIdQuery({ value: params.productId });

  // Create an array for the star rating
  const ratingStars = [];
  if (product?.rating) {
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(product.rating)) {
        ratingStars.push(<StarIcon key={i} className="w-5 h-5 fill-primary stroke-muted-foreground" />);
      } else {
        ratingStars.push(<StarIcon key={i} className="w-5 h-5 fill-muted stroke-muted-foreground" />);
      }
    }
  }

  return (
    <Suspense fallback={<div>Loading Product Details...</div>}>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-7xl px-4 mx-auto py-8 relative w-full min-h-full">
        <div className="relative grid gap-4 md:gap-10 items-start min-h-[70vh] w-full">
          <Image
            alt="Product Image"
            fill
            className="aspect-[2/3] object-fill border border-card w-full rounded-lg overflow-hidden"
            src={product?.images?.at(0) ?? ""}
          />
        </div>

        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-2">
            <h1 className="font-bold text-3xl lg:text-4xl">{product?.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">{ratingStars}</div>
            </div>
            <div className="text-sm leading-loose text-muted-foreground line-clamp-3">
              <p>{product?.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{formatToRand(product?.price ?? 0)}</div>
              <div className="font-semibold text-primary">{formatToPercentage(product?.discountPercentage ?? 0)} off</div>
            </div>

            {product && <ProductDetailsForm product={product} />}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
