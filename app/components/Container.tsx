import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

export default function Container({
  children,
  className = "",
  size = "lg",
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    full: "max-w-full",
  };

  return (
    <div className={`w-full mx-auto px-4 md:px-6 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}