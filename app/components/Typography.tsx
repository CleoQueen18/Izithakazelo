import { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  center?: boolean;
};

export function Heading({ children, level = 1, className = "", center = false }: HeadingProps) {
  const sizeClasses = {
    1: "text-3xl md:text-4xl lg:text-5xl font-bold",
    2: "text-2xl md:text-3xl lg:text-4xl font-bold",
    3: "text-xl md:text-2xl font-semibold",
    4: "text-lg md:text-xl font-semibold",
  };

  const centerClass = center ? "text-center" : "";

  return (
    <h1 className={`${sizeClasses[level]} ${centerClass} ${className}`}>
      {children}
    </h1>
  );
}

export function Paragraph({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}