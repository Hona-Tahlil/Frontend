import * as React from "react";
import { cn } from "@/lib/utils";
import { Button as ShadCnButton } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva("font-[Alibaba]", {
  variants: {
    variant: {
      default:
        "bg-primary rounded-[27px] text-primary-foreground border-[3.5px] border-transparent hover:bg-primary-hover disabled:opacity-100 disabled:bg-primary-disabled disabled:text-primary-disabled-foreground active:bg-primary-press active:border-transparent focus:border-primary-focus-outline",
      link: "bg-transparent shadow-none hover:bg-transparent border-[0px] text-primary underline-offset-6 hover:underline",
    },
    shadow: {
      true: "drop-shadow-lg",
    },
    bold: {
      true: "font-bold",
    },
    size: {
      default: "h-9 text-[15px] px-4 py-2",
      giant: "h-15 w-50 text-[25px] px-4 py-2",
    },
  },
  defaultVariants: {
    shadow: true,
    size: "default",
    variant: "default",
  },
});
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingSize?: number;
}
function Button({
  className,
  size,
  shadow,
  bold,
  variant,
  isLoading = false,
  loadingSize = 4,
  children,
  ...props
}: ButtonProps) {
  return (
    <ShadCnButton
      disabled={isLoading}
      className={cn(buttonVariants({ variant, size, shadow, bold, className }))}
      {...props}
    >
      {isLoading && (
        <Spinner
          className={`text-primary-disabled-foreground !size-${loadingSize}`}
        />
      )}
      {children}
    </ShadCnButton>
  );
}

export { Button, buttonVariants };
