import Link from "next/link";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LayoutHeader from "./_shop-components/LayoutHeader";
import ProductList from "./_shop-components/ProductList";
import { Suspense } from "react";
import CartView from "./_shop-components/CartView";
import { usingGetCurrentUserQuery } from "@/app/_actions/auth-actions";

export default async function Shop() {
  return (
    // <div className="flex flex-col min-h-screen bg-slate-100">
    <div className="flex flex-col min-h-full bg-gray-50/50">
      {/* <LayoutHeader>
        <CartView />
      </LayoutHeader> */}

      <main className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 p-4 md:p-6">
        <div className="hidden md:block">
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground  mb-2">Categories</h3>
              <nav className="grid gap-2">
                <Link className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
                  Clothing
                </Link>
                <Link className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
                  Electronics
                </Link>
                <Link className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
                  Home & Garden
                </Link>
                <Link className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
                  Beauty
                </Link>
                <Link className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
                  Sports
                </Link>
              </nav>
            </div>

            {/* Filters */}
            <div>
              <h3 className="font-semibold text-foreground  mb-2">Filters</h3>
              <Accordion collapsible type="single">
                <AccordionItem value="price">
                  <AccordionTrigger className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50">
                    Price
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                        <Checkbox id="price-under-50" />
                        Under R1000{"\n                                        "}
                      </Label>
                      <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                        <Checkbox id="price-50-100" />
                        R1100 - R2000{"\n                                        "}
                      </Label>
                      <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                        <Checkbox id="price-over-100" />
                        Over R2000{"\n                                        "}
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="brand">
                  <AccordionTrigger className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50">
                    Brand
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                        <Checkbox id="brand-acme" />
                        Acme{"\n                                        "}
                      </Label>
                      <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                        <Checkbox id="brand-globex" />
                        Globex{"\n                                        "}
                      </Label>
                      <Label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                        <Checkbox id="brand-stark" />
                        Stark{"\n                                        "}
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Product Lists */}
        <Suspense fallback={"Loading Products..."}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  );
}
