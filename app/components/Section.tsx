import { ReactNode } from "react";
import Container from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  bg?: "white" | "gray" | "dark" | "none";
  padding?: "sm" | "md" | "lg" | "xl" | "none";
};

export default function Section({
  children,
  className = "",
  bg = "none",
  padding = "lg",
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-gray-900 text-white",
    none: "",
  };

  const paddingClasses = {
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-20",
    xl: "py-20 md:py-28",
    none: "",
  };

  return (
    <section className={`${bgClasses[bg]} ${paddingClasses[padding]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}