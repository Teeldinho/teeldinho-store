"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type NavigationButtonProps = {
  route: string;
  caption: string;
  className?: string;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({ route, caption, className }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(route)} className={cn(className)}>
      {caption}
    </Button>
  );
};

export default NavigationButton;
