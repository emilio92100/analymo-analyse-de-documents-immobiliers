import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md", light = false }: LogoProps) => {
  const heights = { sm: "h-6", md: "h-8", lg: "h-12" };

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
