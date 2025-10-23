import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Roofing_crew_hero_image_6bbee827.png";

interface FinalCTAProps {
  onQuoteClick: () => void;
}

export function FinalCTA({ onQuoteClick }: FinalCTAProps) {
  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-6 text-primary-foreground">
          Klaar om uw Dak te Vernieuwen?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 leading-relaxed">
          Vraag vandaag nog een vrijblijvende offerte aan en ontdek wat wij voor u kunnen betekenen. 
          Onze experts staan klaar om u te helpen met professioneel advies.
        </p>
        <Button 
          size="lg"
          variant="secondary"
          onClick={onQuoteClick}
          className="font-poppins font-semibold text-lg px-8"
          data-testid="button-final-cta"
        >
          Vraag Gratis Offerte Aan
        </Button>
      </div>
    </section>
  );
}
