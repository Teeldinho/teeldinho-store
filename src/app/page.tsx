import { usingLoginMutation } from "./_actions/auth-actions";
import { usingGetAllProductsCategoriesQuery, usingGetAllProductsQuery } from "./_actions/products-actions";
import AllCategoriesList from "./(shopping)/shop/categories/_categories-components/AllCategoriesList";
import { Separator } from "@/components/ui/separator";
import NavigationButton from "@/components/reusable-components/NavigationButton";

export default async function Home() {
  const { data: user } = await usingLoginMutation({ username: "kminchelle", password: "0lelplR" });

  // const { data: categories } = await usingGetAllProductsCategoriesQuery({});

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="relative h-[30dvh] w-full bg-white">
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">Shop Everything</h1>
          <p className="max-w-[600px] md:text-xl text-muted-foreground">Find the perfect item for you or your loved ones.</p>
          <NavigationButton route="/shop" caption="Enter Shop" />
        </div>
      </section>

      <Separator />

      <section className="flex-1 py-12 md:py-12 lg:py-20 bg-gray-50/80">
        <div className="container px-4 md:px-6 flex flex-col gap-8">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-center">Categories</h2>
          {/* The normal convention would be to pass in the fetched categories into the list and then render them accordingly. */}
          {/* But for the sake of this example, we will hardcode the categories. */}
          <AllCategoriesList />
        </div>
      </section>
    </main>
  );
}
