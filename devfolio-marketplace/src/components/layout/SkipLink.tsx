import { cn } from "@/lib/utils";

const SkipLink = () => {
  return (
    <a
      href="#root-main-content"
      className={cn(
        "absolute left-4 top-4 z-[100] px-6 py-3",
        "bg-primary text-primary-foreground font-bold rounded-xl shadow-2xl",
        "transform -translate-y-[200%] transition-transform duration-300",
        "focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary/50"
      )}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
