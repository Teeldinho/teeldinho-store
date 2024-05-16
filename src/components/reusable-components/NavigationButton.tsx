"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

type NavigationButtonProps = ButtonProps & {
  route: string;
  caption: string;
  className?: string;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({ route, caption, className, ...props }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(route)} className={cn(className)} {...props}>
      {caption}
    </Button>
  );
};

export default NavigationButton;
