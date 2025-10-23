import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, ThumbsUp, Users } from "lucide-react";

interface USPsProps {
  businessName: string;
}

const usps = [
  {
    icon: Award,
    title: "Gecertificeerd Vakmanschap",
    description: "Al onze dakdekkers zijn volledig gecertificeerd en hebben jarenlange ervaring in het vak.",
  },
  {
    icon: Clock,
    title: "Snelle Service",
    description: "Spoedopdrachten binnen 24 uur mogelijk. Wij begrijpen dat uw dak niet kan wachten.",
  },
  {
    icon: ThumbsUp,
    title: "Kwaliteitsgarantie",
    description: "Wij bieden uitgebreide garantie op al ons werk en gebruiken alleen A-merk materialen.",
  },
  {
    icon: Users,
    title: "Persoonlijk Contact",
    description: "Directe communicatie met uw dakdekker. Geen tussenpersonen, gewoon eerlijk advies.",
  },
];

export function USPs({ businessName }: USPsProps) {
  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4 text-foreground">
            Waarom Kiezen voor {businessName}?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Uw vertrouwde partner voor alle dakwerkzaamheden
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {usps.map((usp, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-usp-${index}`}>
              <CardContent className="p-6 md:p-8 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <usp.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-poppins mb-2 text-card-foreground">
                    {usp.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {usp.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
