
import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-agro-600 to-agro-500 text-white hover:from-agro-700 hover:to-agro-600 active:from-agro-800 active:to-agro-700 focus:ring-agro-500/50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
        secondary:
          "bg-white text-agro-700 border border-agro-200 hover:bg-agro-50 active:bg-agro-100 focus:ring-agro-500/30 shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
        outline:
          "border border-agro-200 text-agro-700 bg-transparent hover:bg-agro-50 active:bg-agro-100 focus:ring-agro-500/30",
        ghost:
          "text-agro-600 bg-transparent hover:bg-agro-50 active:bg-agro-100 focus:ring-agro-500/30",
        link: "text-agro-600 underline-offset-4 hover:underline focus:ring-agro-500/30",
        danger: 
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10 rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom, buttonVariants };
