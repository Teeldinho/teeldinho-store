"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ButtonNotImplemented() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast.info("Not Implemented.", {
          description: "This feature is not yet implemented.",
        });
      }}
      className="w-full"
    >
      Login with Google
    </Button>
  );
}
