import { FileText } from "lucide-react";

interface QuoteFloatingButtonProps {
  onClick: () => void;
}

export function QuoteFloatingButton({ onClick }: QuoteFloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed left-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-6 shadow-2xl hover:shadow-xl transition-all duration-300 z-40 rounded-r-lg"
      style={{ writingMode: "vertical-rl" }}
      data-testid="button-quote-floating"
      aria-label="Offerte aanvragen"
    >
      <span className="font-poppins font-semibold text-sm flex items-center gap-2">
        <FileText className="h-5 w-5 rotate-90" />
        OFFERTE AANVRAGEN
      </span>
    </button>
  );
}
