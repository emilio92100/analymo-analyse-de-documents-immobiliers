import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ className = "", size = "md", light = false }: LogoProps) => {
  const heights = { sm: "h-8", md: "h-12", lg: "h-16", xl: "h-20" };

  return (
    <img
      src={logoImg}
      alt="Analymo – Analyses intelligentes de documents immobiliers"
      className={cn(
        heights[size],
        "w-auto object-contain",
        light && "brightness-0 invert",
        className
      )}
    />
  );
};

export default Logo;
