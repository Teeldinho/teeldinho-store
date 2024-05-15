"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ButtonBackToStore() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push("/")}>
      Back to Store
    </Button>
  );
}
