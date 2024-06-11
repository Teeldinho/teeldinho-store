import { usingGetAllProductsQuery } from "@/lib/actions/products-actions";
import { Suspense } from "react";
import { ImagesSlider } from "../ui/image-slider";
import CustomSpinner from "./CustomSpinner";

export default async function HomePageImageSlider() {
  const { data: products } = await usingGetAllProductsQuery({});
  const images = products?.map((product) => product.images[0]) ?? [];

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center flex-1 bg-background">
          <CustomSpinner />
        </div>
      }
    >
      <ImagesSlider className="h-full z-0 flex-1" images={images}>
        <></>
      </ImagesSlider>
    </Suspense>
  );
}
