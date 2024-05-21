import Link from "next/link";
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LayoutSide() {
  return (
    <div className="hidden md:block">
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">Categories</h3>
          <nav className="grid gap-2">
            <Link aria-disabled className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Clothing
            </Link>
            <Link aria-disabled className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Electronics
            </Link>
            <Link aria-disabled className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Home & Garden
            </Link>
            <Link aria-disabled className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Beauty
            </Link>
            <Link aria-disabled className="text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-50" href="#">
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
  );
}
