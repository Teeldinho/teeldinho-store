import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCardIcon, DollarSignIcon, WalletCardsIcon } from "lucide-react";
import PaymentForm from "./PaymentForm";
import { usingGetCartsOfAUserQuery } from "@/app/_actions/carts-actions";
import { usingGetCurrentUserQuery } from "@/app/_actions/auth-actions";

export default async function PaymentCard() {
  const user = await usingGetCurrentUserQuery({});
  const { data: cart } = await usingGetCartsOfAUserQuery({
    value: (user?.data?.id ?? 0).toString(),
  });

  if (!cart) {
    return <div>Cart is empty. Failed to load Payment.</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup className="grid grid-cols-3 gap-4" defaultValue="card">
            <div>
              <RadioGroupItem className="peer sr-only" id="card" value="card" />
              <Label
                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                htmlFor="card"
              >
                <CreditCardIcon className="mb-3 h-6 w-6" />
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem className="peer sr-only" id="paypal" value="paypal" />
              <Label
                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                htmlFor="paypal"
              >
                <WalletCardsIcon className="mb-3 h-6 w-6" />
                PayPal
              </Label>
            </div>
            <div>
              <RadioGroupItem className="peer sr-only" id="apple" value="apple" />
              <Label
                className="flex flex-col items-center justify-between rounded-md border-2 border-gray-100 bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-gray-900 [&:has([data-state=checked])]:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:peer-data-[state=checked]:border-gray-50 dark:[&:has([data-state=checked])]:border-gray-50"
                htmlFor="apple"
              >
                <DollarSignIcon className="mb-3 h-6 w-6" />
                Apple Pay
              </Label>
            </div>
          </RadioGroup>
        </CardContent>

        <CardFooter>
          <PaymentForm cart={cart} />
        </CardFooter>
      </Card>
    </div>
  );
}
