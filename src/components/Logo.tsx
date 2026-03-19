import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  light?: boolean;
}

const Logo = ({ className = "", showSubtitle = false, light = false }: LogoProps) => {
  const textColor = light ? "text-primary-foreground" : "text-primary";
  const borderColor = light ? "border-primary-foreground" : "border-primary";
  const bgColor = light ? "bg-primary-foreground" : "bg-primary";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        <span className={cn("text-2xl font-extrabold tracking-tight", textColor)}>
          Analym
        </span>
        <div className="relative">
          <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", borderColor)}>
            <svg width="8" height="8" viewBox="0 0 8 8" className={cn(light ? "text-white" : "text-primary")}>
              <path d="M1 4 Q4 1 7 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div className={cn("absolute -bottom-0.5 -right-1 w-3 h-0.5 rotate-45 rounded-full", bgColor)} />
        </div>
      </div>
      {showSubtitle && (
        <div className="ml-2">
          <div className={cn("text-[8px] font-bold tracking-[0.2em] uppercase opacity-70", textColor)}>
            Analyse de documents immobiliers
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
