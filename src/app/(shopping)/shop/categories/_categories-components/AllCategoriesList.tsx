import CategoryCard from "./CategoryCard";
import {
  CarIcon,
  DiamondIcon,
  FlowerIcon,
  GlassesIcon,
  IceCreamConeIcon,
  LaptopIcon,
  LightbulbIcon,
  ShirtIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  SofaIcon,
  WatchIcon,
} from "lucide-react";

export default function AllCategoriesList() {
  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category, index) => (
        <CategoryCard key={index} icon={category.icon} name={category.name} href={category.href} />
      ))}
    </div>
  );
}

const categories = [
  { icon: <SmartphoneIcon className="size-10" />, name: "Smartphones", href: "#" },
  { icon: <LaptopIcon className="size-10" />, name: "Laptops", href: "#" },
  { icon: <FlowerIcon className="size-10" />, name: "Fragrances", href: "#" },
  { icon: <IceCreamConeIcon className="size-10" />, name: "Skincare", href: "#" },
  { icon: <ShoppingBagIcon className="size-10" />, name: "Groceries", href: "#" },
  { icon: <FlowerIcon className="size-10" />, name: "Home Decor", href: "#" },
  { icon: <SofaIcon className="size-10" />, name: "Furniture", href: "#" },
  { icon: <ShirtIcon className="size-10" />, name: "Clothing", href: "#" },
  { icon: <WatchIcon className="size-10" />, name: "Watches", href: "#" },
  { icon: <DiamondIcon className="size-10" />, name: "Jewelry", href: "#" },
  { icon: <GlassesIcon className="size-10" />, name: "Sunglasses", href: "#" },
  { icon: <LightbulbIcon className="size-10" />, name: "Lighting", href: "#" },
];
