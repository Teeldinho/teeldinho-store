import AllCategoriesList from "./(shopping)/shop/categories/_categories-components/AllCategoriesList";
import { Separator } from "@/components/ui/separator";
import NavigationButton from "@/components/reusable-components/NavigationButton";
import { LogIn } from "lucide-react";
import HomePageImageSlider from "@/components/reusable-components/HomePageImageSlider";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="relative h-[40dvh] w-full bg-card flex">
        <Suspense fallback={<div className="flex items-center justify-center flex-1 bg-background"></div>}>
          <HomePageImageSlider />
        </Suspense>
        <div className="flex flex-col items-center justify-center space-y-4 text-center flex-1 dark:bg-transparent/50">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">Shop Everything</h1>
          <p className="max-w-[600px] md:text-xl text-muted-foreground">Find the perfect item for you or your loved ones.</p>
          <NavigationButton route="/login" caption="Login">
            <LogIn className="size-4 mr-2" />
          </NavigationButton>
        </div>
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
  );
}
