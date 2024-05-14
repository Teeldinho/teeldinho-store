import BillingCard from "./_checkout-components/BillingCard";
import PaymentCard from "./_checkout-components/PaymentCard";
import OrderSummaryCard from "./_checkout-components/OrderSummaryCard";

export default function Checkout() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 px-4 py-8 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Order Summary Card */}
          <OrderSummaryCard />

          {/* Billing Card */}
          <BillingCard />
        </div>

        {/* Payment Card  */}
        <PaymentCard />
      </main>
    </>
  );
}
