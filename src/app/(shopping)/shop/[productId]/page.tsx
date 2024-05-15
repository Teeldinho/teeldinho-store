import { usingGetProductByIdQuery } from "@/app/_actions/products-actions";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import Image from "next/image";
import { formatToPercentage, formatToRand } from "@/lib/utils";
import ButtonAddToCart from "@/components/reusable-components/ButtonAddToCart";
import { StarIcon } from "lucide-react";
import ButtonBackToShop from "@/components/reusable-components/ButtonBackToShop";
import { Suspense } from "react";

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
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 relateive">
        <div className="absolute top-4 left-4">
          <ButtonBackToShop />
        </div>
        <div className="relative grid gap-4 md:gap-10 items-start min-h-96 w-full h-full">
          <Image
            alt="Product Image"
            fill
            className="aspect-[2/3] object-fill border border-gray-200 w-full rounded-lg overflow-hidden"
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
              <div className="font-semibold text-green-600">{formatToPercentage(product?.discountPercentage ?? 0)} off</div>
            </div>

            <div className="text-4xl font-bold"></div>
            <form className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="color">
                  Color
                </Label>
                <RadioGroup className="flex items-center gap-2" defaultValue="black" id="color">
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-black"
                  >
                    <RadioGroupItem id="color-black" value="black" />
                    Black
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-white"
                  >
                    <RadioGroupItem id="color-white" value="white" />
                    White
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-blue"
                  >
                    <RadioGroupItem id="color-blue" value="blue" />
                    Blue
                  </Label>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: product?.stock ?? 0 }, (_, i) => (
                      <SelectItem key={i} value={String(i + 1)}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <ButtonAddToCart productToAdd={{ id: product?.id!, quantity: 1 }} redirectToCheckout />
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
