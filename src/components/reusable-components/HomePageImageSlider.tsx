import { usingGetAllProductsQuery } from "@/lib/actions/products-actions";
import { ImagesSlider } from "../ui/image-slider";

export default async function HomePageImageSlider() {
  const { data: products } = await usingGetAllProductsQuery({});
  const images = products?.map((product) => product.images[0]) ?? [];

  if (!images.length) {
    return null;
  }

  return (
    <ImagesSlider className="h-full flex-1" images={images}>
      <></>
    </ImagesSlider>
  );
}
