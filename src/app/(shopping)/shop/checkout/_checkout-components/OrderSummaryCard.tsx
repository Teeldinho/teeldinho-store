import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import OrderSummaryTable from "./OrderSummaryTable";

export default function OrderSummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderSummaryTable />
      </CardContent>
    </Card>
  );
}
