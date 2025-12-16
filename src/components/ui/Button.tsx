"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  icon,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-400 cursor-pointer";

  const variants = {
    primary: "btn-gradient text-blanc hover:shadow-lg",
    secondary: "bg-noir text-blanc hover:bg-noir-light",
    outline:
      "bg-transparent border-2 border-dore text-dore hover:bg-dore hover:text-blanc",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {icon}
      {children}
    </button>
  );
}

