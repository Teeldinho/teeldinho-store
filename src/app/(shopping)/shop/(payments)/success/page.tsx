import { Suspense } from "react";
import SuccessPage from "./_success-components/SuccessPage";

export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<div>Loading Payment Feedback</div>}>
      <SuccessPage />
    </Suspense>
  );
}
