import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-base font-bold transition-colors disabled:cursor-not-allowed text-center",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-lightBlue text-white",
        outline:
          "border border-primary text-primary font-medium hover:bg-veryLightBlue",
      },
      size: {
        default: "py-3 px-6",
        sm: "py-2 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    const baseClassName = buttonVariants({ variant, size });
    const mergedClassName = twMerge(baseClassName, className);

    return <button ref={ref} className={mergedClassName} {...props} />;
  }
);

export { Button, buttonVariants };