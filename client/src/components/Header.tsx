import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useDemoContext, getDemoPath } from "@/contexts/DemoContext";

interface HeaderProps {
  businessName: string;
  logoText: string;
  logoUrl?: string | null;
  onQuoteClick: () => void;
}

export function Header({ businessName, logoText, logoUrl, onQuoteClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { demoSlug } = useDemoContext();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover-elevate rounded-md px-3 py-2 flex items-center min-h-[48px]"
            data-testid="button-logo"
          >
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={businessName}
                className="h-10 md:h-12 object-contain"
                loading="eager"
                decoding="async"
              />
            ) : (
              <span className="text-xl md:text-2xl font-bold font-poppins text-foreground">
                {logoText}
              </span>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href={getDemoPath("/", demoSlug)}
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-home"
            >
              Home
            </a>
            <div className="relative group">
              <button
                onClick={() => scrollToSection("diensten")}
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid="link-diensten"
              >
                Diensten
              </button>
              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-2 w-56 bg-card border border-card-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a href={getDemoPath("/diensten/dakbedekking", demoSlug)} className="block px-4 py-2 text-sm hover-elevate text-card-foreground">Dakbedekking</a>
                  <a href={getDemoPath("/diensten/plat-dak", demoSlug)} className="block px-4 py-2 text-sm hover-elevate text-card-foreground">Plat Dak</a>
                  <a href={getDemoPath("/diensten/dakreparatie", demoSlug)} className="block px-4 py-2 text-sm hover-elevate text-card-foreground">Dakreparatie</a>
                  <a href={getDemoPath("/diensten/dakisolatie", demoSlug)} className="block px-4 py-2 text-sm hover-elevate text-card-foreground">Dakisolatie</a>
                  <a href={getDemoPath("/diensten/dakgoten", demoSlug)} className="block px-4 py-2 text-sm hover-elevate text-card-foreground">Dakgoten</a>
                  <a href={getDemoPath("/diensten/dakonderhoud", demoSlug)} className="block px-4 py-2 text-sm hover-elevate text-card-foreground">Dakonderhoud</a>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-reviews"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-faq"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-contact"
            >
              Contact
            </button>
            <Button 
              onClick={onQuoteClick}
              variant="default"
              className="font-poppins font-semibold"
              data-testid="button-offerte-header"
            >
              Offerte Aanvragen
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 border-t border-border overflow-y-auto">
          <nav className="flex flex-col p-6 gap-4">
            <a
              href={getDemoPath("/", demoSlug)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground py-3 text-left hover-elevate rounded-md px-4"
              data-testid="link-home-mobile"
            >
              Home
            </a>
            <div className="border-l-2 border-border pl-4 space-y-2">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Diensten</p>
              <a href={getDemoPath("/diensten/dakbedekking", demoSlug)} onClick={() => setIsMobileMenuOpen(false)} className="block text-base py-2 hover-elevate rounded-md px-3">Dakbedekking</a>
              <a href={getDemoPath("/diensten/plat-dak", demoSlug)} onClick={() => setIsMobileMenuOpen(false)} className="block text-base py-2 hover-elevate rounded-md px-3">Plat Dak</a>
              <a href={getDemoPath("/diensten/dakreparatie", demoSlug)} onClick={() => setIsMobileMenuOpen(false)} className="block text-base py-2 hover-elevate rounded-md px-3">Dakreparatie</a>
              <a href={getDemoPath("/diensten/dakisolatie", demoSlug)} onClick={() => setIsMobileMenuOpen(false)} className="block text-base py-2 hover-elevate rounded-md px-3">Dakisolatie</a>
              <a href={getDemoPath("/diensten/dakgoten", demoSlug)} onClick={() => setIsMobileMenuOpen(false)} className="block text-base py-2 hover-elevate rounded-md px-3">Dakgoten</a>
              <a href={getDemoPath("/diensten/dakonderhoud", demoSlug)} onClick={() => setIsMobileMenuOpen(false)} className="block text-base py-2 hover-elevate rounded-md px-3">Dakonderhoud</a>
            </div>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-lg font-medium text-foreground py-3 text-left hover-elevate rounded-md px-4"
              data-testid="link-reviews-mobile"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-lg font-medium text-foreground py-3 text-left hover-elevate rounded-md px-4"
              data-testid="link-faq-mobile"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-lg font-medium text-foreground py-3 text-left hover-elevate rounded-md px-4"
              data-testid="link-contact-mobile"
            >
              Contact
            </button>
            <Button 
              onClick={onQuoteClick}
              variant="default"
              className="w-full font-poppins font-semibold mt-4"
              data-testid="button-offerte-mobile"
            >
              Offerte Aanvragen
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
