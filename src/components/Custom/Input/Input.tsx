import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Input as ShadCnInput } from "@/components/ui/input";
import customStyles from "./Input.module.css";

const inputVariants = cva(
  "flex h-13 w-full !text-[15px] rounded-full border border-[1px] border-black/40 bg-white font-[Alibaba] font-bold px-6 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      shadow: {
        false: "shadow-sm",
        true: "drop-shadow-lg",
      },
    },
    defaultVariants: {
      shadow: false,
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

function Input({ className, shadow, ...props }: InputProps) {
  return (
    <ShadCnInput
      dir="rtl"
      className={cn(inputVariants({ shadow, className }), customStyles.input)}
      {...props}
    />
  );
}

export { Input };
