import NavigationButton from "@/components/reusable-components/NavigationButton";
import { ShoppingCartIcon } from "lucide-react";

export default function EmptyCart() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <ShoppingCartIcon className="w-20 h-20 mb-6 text-gray-400 dark:text-gray-600" />
      <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
        Looks like you have not added anything to your cart yet.
        <br />
        Start exploring our collection and add some products!
      </p>

      <NavigationButton route="/shop" caption="Start Shopping" />
    </section>
  );
}
