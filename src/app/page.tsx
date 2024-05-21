import AllCategoriesList from "./(shopping)/shop/categories/_categories-components/AllCategoriesList";
import { Separator } from "@/components/ui/separator";
import NavigationButton from "@/components/reusable-components/NavigationButton";
import { LogIn } from "lucide-react";
import { Suspense } from "react";
import { usingGetAllProductsQuery } from "./_actions/products-actions";
import { ImagesSlider } from "@/components/ui/image-slider";

export default async function Home() {
  const { data: products } = await usingGetAllProductsQuery({});

  const images = products?.map((product) => product.images[0]) ?? [];

  return (
    <Suspense fallback={<div>Loading Home Page...</div>}>
      <main className="flex min-h-screen flex-col bg-background">
        <section className="relative h-[30dvh] w-full bg-card">
          <ImagesSlider className="h-full" images={images}>
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">Shop Everything</h1>
              <p className="max-w-[600px] md:text-xl text-muted-foreground">Find the perfect item for you or your loved ones.</p>
              <NavigationButton route="/login" caption="Login">
                <LogIn className="size-4 mr-2" />
              </NavigationButton>
            </div>
          </ImagesSlider>
        </section>

        <Separator />

        <section className="flex-1 py-12 md:py-14">
          <div className="container px-4 md:px-6 flex flex-col gap-8">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-center">Categories</h2>
            {/* The normal convention would be to pass in the fetched categories into the list and then render them accordingly. */}
            {/* But for the sake of this example, we will hardcode the categories. */}
            <AllCategoriesList />
          </div>
        </section>
      </main>
    </Suspense>
  );
}
