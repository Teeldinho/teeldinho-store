"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ButtonBackToShop() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push("/shop")}>
      Back to Store
    </Button>
  );
}
