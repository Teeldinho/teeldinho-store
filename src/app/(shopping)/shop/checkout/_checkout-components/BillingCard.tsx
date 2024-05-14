import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BillingForm from "./BillingForm";

export default function BillingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Shipping</CardTitle>
      </CardHeader>
      <CardContent>
        <BillingForm />
      </CardContent>
    </Card>
  );
}
