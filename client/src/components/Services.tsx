import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Wrench, Shield, Snowflake, Wind, Droplets, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useDemoContext, getDemoPath } from "@/contexts/DemoContext";
import pitchedRoofImage from "@assets/generated_images/Pitched_roof_service_image_cfe08b30.png";
import flatRoofImage from "@assets/generated_images/Flat_roof_service_image_07e55321.png";
import repairImage from "@assets/generated_images/Roof_repair_service_image_4e9c21d0.png";

const services = [
  {
    id: "dakbedekking",
    title: "Dakbedekking",
    description: "Complete dakbedekkingen voor nieuwbouw en renovatie. Wij werken met hoogwaardige materialen voor een duurzaam resultaat.",
    icon: Home,
    image: pitchedRoofImage,
  },
  {
    id: "plat-dak",
    title: "Plat Dak Specialist",
    description: "Specialist in platte daken met EPDM, bitumen en andere moderne dakbedekkingsmaterialen voor optimale waterafvoer.",
    icon: Shield,
    image: flatRoofImage,
  },
  {
    id: "dakreparatie",
    title: "Dakreparatie",
    description: "Snelle en professionele reparatie van uw dak. Van kleine lekkages tot grote renovaties, wij helpen u verder.",
    icon: Wrench,
    image: repairImage,
  },
  {
    id: "dakisolatie",
    title: "Dakisolatie",
    description: "Bespaar op energiekosten met professionele dakisolatie. Wij isoleren zowel platte als hellende daken volgens de laatste normen.",
    icon: Snowflake,
    image: pitchedRoofImage,
  },
  {
    id: "dakgoten",
    title: "Dakgoten & Afvoer",
    description: "Installatie, reparatie en onderhoud van dakgoten en regenwaterafvoersystemen voor een waterdicht resultaat.",
    icon: Droplets,
    image: flatRoofImage,
  },
  {
    id: "dakonderhoud",
    title: "Dakonderhoud",
    description: "Regelmatig onderhoud verlengt de levensduur van uw dak. Wij verzorgen inspectie, reiniging en klein onderhoud.",
    icon: Wind,
    image: repairImage,
  },
];

export function Services() {
  const { demoSlug } = useDemoContext();

  return (
    <section id="diensten" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4 text-foreground">
            Onze Diensten
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professionele dakdekker diensten voor particulieren en bedrijven
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="group hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden flex flex-col"
              data-testid={`card-service-${index}`}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <service.icon className="h-10 w-10 text-white" />
                </div>
              </div>

              <CardHeader className="p-4 md:p-5 flex-grow">
                <CardTitle className="text-xl md:text-2xl font-bold font-poppins mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 md:p-5 pt-0">
                <Link href={getDemoPath(`/diensten/${service.id}`, demoSlug)}>
                  <Button 
                    variant="default" 
                    className="w-full group-hover:shadow-md transition-shadow"
                  >
                    Meer Informatie
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
