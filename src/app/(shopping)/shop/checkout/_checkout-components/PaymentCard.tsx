import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCardIcon, DollarSignIcon, WalletCardsIcon } from "lucide-react";
import PaymentForm from "./PaymentForm";

export default function PaymentCard() {
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
                className="flex hover:cursor-pointer flex-col items-center justify-between rounded-md border-2 border-card-background bg-background p-4 hover:bg-primary/5 hover:text-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                htmlFor="card"
              >
                <CreditCardIcon className="mb-3 h-6 w-6" />
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem className="peer sr-only" id="paypal" value="paypal" />
              <Label
                className="flex hover:cursor-pointer flex-col items-center justify-between rounded-md border-2 border-card border-card-background bg-background p-4 hover:bg-primary/5 hover:text-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                htmlFor="paypal"
              >
                <WalletCardsIcon className="mb-3 h-6 w-6" />
                PayPal
              </Label>
            </div>
            <div>
              <RadioGroupItem className="peer sr-only" id="apple" value="apple" />
              <Label
                className="flex hover:cursor-pointer flex-col items-center justify-between rounded-md border-2 border-card-background bg-background p-4 hover:bg-primary/5 hover:text-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                htmlFor="apple"
              >
                <DollarSignIcon className="mb-3 h-6 w-6" />
                Apple Pay
              </Label>
            </div>
          </RadioGroup>
        </CardContent>

        <CardFooter>
          <PaymentForm />
        </CardFooter>
      </Card>
    </div>
  );
}
