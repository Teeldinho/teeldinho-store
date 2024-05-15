import ProductList from "./_shop-components/ProductList";
import { Suspense } from "react";
import LayoutSide from "./_shop-components/LayoutSide";

export default async function Shop() {
  return (
    <div className="flex flex-col min-h-full min-w-full bg-card-background">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 p-4 md:p-6">
        <LayoutSide />

        {/* Product Lists */}
        <Suspense fallback={"Loading Products..."}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  );
}
