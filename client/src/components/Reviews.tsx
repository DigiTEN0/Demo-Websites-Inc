import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { SiGoogle } from "react-icons/si";

const reviews = [
  {
    name: "Jan van der Berg",
    rating: 5,
    text: "Uitstekende service! Het team was professioneel, netjes en het resultaat overtreft onze verwachtingen. Ons nieuwe dak ziet er prachtig uit en is volledig waterdicht.",
    date: "2 weken geleden",
    initial: "J",
  },
  {
    name: "Maria Jansen",
    rating: 5,
    text: "Zeer tevreden met de dakbedekking. Goede communicatie, op tijd begonnen en afgerond binnen de afgesproken tijd. Prijs-kwaliteit verhouding is uitstekend!",
    date: "1 maand geleden",
    initial: "M",
  },
  {
    name: "Peter de Vries",
    rating: 5,
    text: "Snelle reactie op onze spoedopdracht. Lekkage binnen 24 uur verholpen. Vriendelijk personeel en eerlijke prijzen. Absoluut een aanrader!",
    date: "3 weken geleden",
    initial: "P",
  },
  {
    name: "Sophie Bakker",
    rating: 5,
    text: "Ons platte dak is vakkundig gerenoveerd. Het team heeft alles keurig achtergelaten en uitgebreid uitgelegd wat ze gedaan hebben. Top service!",
    date: "1 maand geleden",
    initial: "S",
  },
];

const avatarColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
];

interface ReviewsProps {
  googleMapsReviewUrl?: string | null;
}

export function Reviews({ googleMapsReviewUrl }: ReviewsProps) {
  const averageRating = 5.0;
  const totalReviews = 127;

  return (
    <section id="reviews" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-4 bg-white dark:bg-card p-6 rounded-xl shadow-lg border border-border mb-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" 
              alt="Google"
              className="h-12 w-12"
            />
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1">
                Gebaseerd op {totalReviews} reviews
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-foreground">
            Wat Onze Klanten Zeggen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="hover-elevate bg-white dark:bg-card" data-testid={`card-review-${index}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-semibold">
                      {review.initial}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-base text-card-foreground">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" 
                    alt="Google"
                    className="h-5 w-5 flex-shrink-0"
                  />
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {googleMapsReviewUrl && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="font-poppins font-semibold"
            >
              <a 
                href={googleMapsReviewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Bekijk Alle Reviews
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
