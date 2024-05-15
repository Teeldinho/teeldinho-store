import { usingGetCurrentUserQuery } from "@/app/_actions/auth-actions";
import { usingGetCartsOfAUserQuery } from "@/app/_actions/carts-actions";
import CartViewDrawer from "./CartViewDrawer";

export default async function CartView() {
  const user = await usingGetCurrentUserQuery({});
  const { data: cart } = await usingGetCartsOfAUserQuery({
    value: (user?.data?.id ?? 0).toString(),
  });

  return <CartViewDrawer cart={cart ?? null} />;
}
