"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HookActionStatus } from "next-safe-action/hooks";
import React from "react";

type ButtonSubmitFormProps = {
  status: HookActionStatus;
  idleString: string;
  executingString: string;
  children?: React.ReactNode;
};

export default function ButtonSubmitForm({ status, idleString, executingString, children }: ButtonSubmitFormProps) {
  return (
    <Button
      className={cn("w-full font-bold", status === "executing" ? "animate-pulse" : null)}
      size={"lg"}
      type="submit"
      disabled={status === "executing"}
    >
      {status === "executing" ? executingString : idleString}

      {children && <span className="inset-0 ml-2">{children}</span>}
    </Button>
  );
}
