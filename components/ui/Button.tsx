/* ============================================================
   BUTTON — 3 variants: primary | secondary | ghost
   Source: Implementation Plan §3.3 (#1)
   
   Usage:
   <Button variant="primary">Book Now</Button>
   <Button variant="secondary" href="/services">Our Services</Button>
   <Button variant="ghost" icon={<ArrowRight />}>Learn More</Button>
   ============================================================ */

import { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Native button props
interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
}

// Link props (renders Next.js <Link>)
interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-pearl hover:bg-gold/90 shadow-float active:scale-[0.98]",
  secondary:
    "bg-transparent text-espresso border-2 border-espresso/20 hover:border-gold hover:text-gold active:scale-[0.98]",
  ghost:
    "bg-transparent text-gold hover:text-gold/80 underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "default",
    icon,
    iconPosition = "right",
    fullWidth = false,
    children,
    className,
    ...rest
  } = props;

  const sharedClasses = clsx(
    "inline-flex items-center justify-center gap-2 rounded-xl font-body font-semibold transition-all duration-200 cursor-pointer",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="w-4 h-4">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="w-4 h-4">{icon}</span>
      )}
    </>
  );

  // If href is present, render as Next.js Link
  if ("href" in rest && rest.href) {
    const { href, target, rel, onClick, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={sharedClasses}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as <button>
  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      className={sharedClasses}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...buttonRest}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
