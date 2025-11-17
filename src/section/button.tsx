import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva({});

function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return <button className={buttonVariants({ className })} {...props} />;
}

export { Button, buttonVariants };
