import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card";
import { usingGetCartsOfAUserQuery } from "@/app/_actions/carts-actions";
import OrderSummaryTable from "./OrderSummaryTable";
import { getIronSessionData } from "@/lib/sessions/iron-session";

export default async function OrderSummaryCard() {
  const { id } = await getIronSessionData();

  // if (!id) throw new Error("User not found");

  if (!id) return null;

  const { data: cart } = await usingGetCartsOfAUserQuery({
    value: id.toString(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderSummaryTable cart={cart ?? null} />
      </CardContent>
    </Card>
  );
}
