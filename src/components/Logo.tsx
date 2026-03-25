import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo-analymo.png";

interface LogoProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showSubtitle?: boolean;
}

const Logo = ({ className = "", size = "md", light = false }: LogoProps) => {
  const heights = { sm: "h-14", md: "h-20", lg: "h-32", xl: "h-50" };

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
