import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { usingGetCurrentUserQuery } from "@/app/_actions/auth-actions";
import { usingGetCartsOfAUserQuery } from "@/app/_actions/carts-actions";
import OrderSummaryTable from "./OrderSummaryTable";

export default async function OrderSummaryCard() {
  const user = await usingGetCurrentUserQuery({});
  const { data: cart } = await usingGetCartsOfAUserQuery({
    value: (user?.data?.id ?? 0).toString(),
  });

  if (!cart) {
    return <div>Cart is empty. Failed to products.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderSummaryTable cart={cart} />
      </CardContent>
    </Card>
  );
}
