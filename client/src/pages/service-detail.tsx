import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { DemoProvider } from "@/DemoContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteFormSidebar } from "@/components/QuoteFormSidebar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QuoteFloatingButton } from "@/components/QuoteFloatingButton";
import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { SiteSettings, Demo } from "@shared/schema";
import pitchedRoofImage from "@assets/generated_images/Pitched_roof_service_image_cfe08b30.png";
import flatRoofImage from "@assets/generated_images/Flat_roof_service_image_07e55321.png";
import repairImage from "@assets/generated_images/Roof_repair_service_image_4e9c21d0.png";

const serviceData: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  benefits: string[];
  process: string[];
}> = {
  "dakbedekking": {
    title: "Dakbedekking",
    description: "Complete dakbedekkingen voor nieuwbouw en renovatie",
    longDescription: "Wij leveren complete dakbedekkingen voor zowel nieuwbouw als renovatieprojecten. Of u nu kiest voor traditionele dakpannen, leien of moderne dakbedekking, wij werken uitsluitend met hoogwaardige A-merk materialen die zorgen voor een duurzaam en betrouwbaar resultaat. Ons ervaren team zorgt voor een vakkundige installatie volgens de nieuwste normen en technieken.",
    image: pitchedRoofImage,
    benefits: [
      "Hoogwaardige A-merk materialen",
      "Professionele vakmannen met jarenlange ervaring",
      "10 jaar garantie op materiaal en vakmanschap",
      "Snelle en efficiënte uitvoering",
      "Gratis inspectie en vrijblijvende offerte",
    ],
    process: [
      "Gratis inspectie en advies op locatie",
      "Gedetailleerde offerte met duidelijke prijsopgave",
      "Planning en voorbereiding van de werkzaamheden",
      "Professionele uitvoering door ervaren dakdekkers",
      "Oplevering en garantieverstrekking",
    ],
  },
  "plat-dak": {
    title: "Plat Dak Specialist",
    description: "Specialist in platte daken met EPDM en bitumen",
    longDescription: "Als specialist in platte daken hebben wij ruime ervaring met EPDM rubber, bitumen en andere moderne dakbedekkingsmaterialen. Een plat dak vereist specifieke kennis en vakmanschap om te zorgen voor optimale waterafvoer en langdurige bescherming. Wij bieden complete oplossingen voor nieuwbouw, renovatie en onderhoud van platte daken.",
    image: flatRoofImage,
    benefits: [
      "Specialistische kennis van platte daken",
      "EPDM rubber met 30+ jaar levensduur",
      "Perfecte waterafvoer en vochtbeheersing",
      "Energiezuinige isolatie-opties",
      "Onderhoudsvriendelijke oplossingen",
    ],
    process: [
      "Technische inspectie van het huidige dak",
      "Advies over materiaalkeuze en isolatie",
      "Offerte inclusief alle werkzaamheden",
      "Verwijdering oude dakbedekking indien nodig",
      "Installatie nieuwe waterdichte dakbedekking",
    ],
  },
  "dakreparatie": {
    title: "Dakreparatie",
    description: "Snelle en professionele reparatie van uw dak",
    longDescription: "Een lekkend dak vraagt om snelle actie. Wij zijn specialist in dakreparaties en kunnen binnen 24 uur ter plaatse zijn voor spoedklussen. Of het nu gaat om een paar losse dakpannen, een lekkage in het platte dak of schade na storm, wij lossen het snel en vakkundig op. Kleine reparaties voorkomen grote schade en hoge kosten.",
    image: repairImage,
    benefits: [
      "Spoedservice binnen 24 uur mogelijk",
      "Directe diagnose en oplossing",
      "Preventief onderhoud om toekomstige schade te voorkomen",
      "Eerlijke prijzen zonder verrassingen",
      "Garantie op alle reparatiewerkzaamheden",
    ],
    process: [
      "Telefonische melding van het probleem",
      "Spoedafspraak voor inspectie (indien urgent)",
      "Diagnose en prijsopgave ter plaatse",
      "Directe reparatie of planning indien mogelijk",
      "Controle en garantie op de reparatie",
    ],
  },
  "dakisolatie": {
    title: "Dakisolatie",
    description: "Bespaar op energiekosten met professionele dakisolatie",
    longDescription: "Goed geïsoleerde daken kunnen tot 30% op uw energiekosten besparen. Wij isoleren zowel platte als hellende daken volgens de laatste bouwvoorschriften en isolatienormen. Naast energiebesparing zorgt goede dakisolatie ook voor beter wooncomfort en verhoogt het de waarde van uw woning.",
    image: pitchedRoofImage,
    benefits: [
      "Tot 30% besparing op energiekosten",
      "Beter wooncomfort zomer en winter",
      "Conform nieuwste isolatie-eisen",
      "Subsidies en fiscale voordelen mogelijk",
      "Verhoogt waarde van uw woning",
    ],
    process: [
      "Energiescan en advies over isolatiewaarde",
      "Keuze uit verschillende isolatiematerialen",
      "Offerte inclusief mogelijke subsidies",
      "Professionele installatie zonder overlast",
      "Oplevering met isolatiecertificaat",
    ],
  },
  "dakgoten": {
    title: "Dakgoten & Afvoer",
    description: "Installatie en onderhoud van dakgoten",
    longDescription: "Goed functionerende dakgoten en regenwaterafvoer zijn essentieel voor de bescherming van uw woning. Wij verzorgen de installatie, reparatie en onderhoud van dakgoten, regenpijpen en complete afvoersystemen. Verstopte of lekkende dakgoten kunnen leiden tot vochtproblemen en schade aan de gevel.",
    image: flatRoofImage,
    benefits: [
      "Voorkomt vochtschade aan gevel en fundering",
      "Verschillende materialen: zink, koper, aluminium",
      "Professionele montage met goede afschot",
      "Reinigingsservice en onderhoud",
      "Bladvangers voor minder onderhoud",
    ],
    process: [
      "Inspectie van huidige dakgoten en afvoer",
      "Advies over materiaal en afmetingen",
      "Offerte voor nieuw of reparatie",
      "Installatie of reparatie door vakmannen",
      "Controle en testen van de waterafvoer",
    ],
  },
  "dakonderhoud": {
    title: "Dakonderhoud",
    description: "Regelmatig onderhoud verlengt de levensduur",
    longDescription: "Preventief dakonderhoud is de sleutel tot een lang meegaand dak. Door regelmatige inspectie en klein onderhoud voorkomt u grote reparaties en verlengt u de levensduur van uw dak aanzienlijk. Wij bieden onderhoudscontracten op maat waarbij wij uw dak jaarlijks inspecteren en direct kleine problemen verhelpen.",
    image: repairImage,
    benefits: [
      "Voorkomt dure reparaties en vervanging",
      "Verlengt levensduur van uw dak",
      "Jaarlijkse inspectie en rapportage",
      "Direct herstel van kleine gebreken",
      "Vaste contactpersoon en planning",
    ],
    process: [
      "Opstellen onderhoudscontract op maat",
      "Jaarlijkse inspectie van het dak",
      "Reiniging van dakgoten en afvoeren",
      "Klein onderhoud direct uitgevoerd",
      "Rapportage en advies voor toekomst",
    ],
  },
};

export default function ServiceDetail() {
  const params = useParams<{ id: string; slug?: string }>();
  const serviceId = params.id || "";
  const demoSlug = params.slug;
  const service = serviceData[serviceId];
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  // Load demo data if we have a slug
  const { data: demo } = useQuery<Demo>({
    queryKey: [`/api/demo/${demoSlug}`],
    enabled: !!demoSlug,
  });

  // Load default settings as fallback
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ["/api/settings"],
    enabled: !demoSlug,
  });

  // Use demo data if available, otherwise use settings
  const businessName = demo?.businessName || settings?.businessName || "BEDRIJFSNAAM";
  const logoText = demo?.logoText || settings?.logoText || "BEDRIJFSNAAM";
  const logoUrl = demo?.logoUrl || settings?.logoUrl;
  const phoneNumber = demo?.phoneNumber || settings?.phoneNumber || "+31 6 12345678";
  const email = demo?.email || settings?.email || "info@dakdekker.nl";
  const whatsappNumber = demo?.whatsappNumber || settings?.whatsappNumber || "31612345678";
  const address = demo?.address || settings?.address || "Amsterdam, Nederland";

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dienst niet gevonden</h1>
          <a href="/" className="text-primary hover:underline">
            Terug naar home
          </a>
        </div>
      </div>
    );
  }

  const content = (
    <div className="min-h-screen bg-background">
      <Header 
        businessName={businessName}
        logoText={logoText}
        logoUrl={logoUrl}
        onQuoteClick={() => setIsQuoteFormOpen(true)}
      />

      {/* Hero Section */}
      <section 
        className="relative min-h-[400px] md:min-h-[500px] flex items-center mt-16 md:mt-20"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 w-full text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-poppins mb-4">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            {service.description}
          </p>
          <Button 
            size="lg"
            onClick={() => setIsQuoteFormOpen(true)}
            className="font-poppins font-semibold"
            data-testid="button-request-quote"
          >
            Vraag Gratis Offerte Aan
          </Button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold font-poppins mb-6">
                  Over {service.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  Voordelen
                </h3>
                <div className="grid gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-base text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  Ons Werkproces
                </h3>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-base text-card-foreground pt-1">{step}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 md:p-8 sticky top-24">
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  Vraag een Offerte Aan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ontvang binnen 24 uur een vrijblijvende offerte op maat voor uw project.
                </p>
                <Button 
                  className="w-full font-poppins font-semibold mb-4"
                  onClick={() => setIsQuoteFormOpen(true)}
                  data-testid="button-sidebar-quote"
                >
                  Offerte Aanvragen
                </Button>
                <div className="border-t border-border pt-6 mt-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-1">Telefoon</p>
                    <a 
                      href={`tel:${phoneNumber}`}
                      className="text-primary hover:underline"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">E-mail</p>
                    <a 
                      href={`mailto:${email}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Map address={address} />

      <Footer 
        businessName={businessName}
        logoText={logoText}
        logoUrl={logoUrl}
        email={email}
        phoneNumber={phoneNumber}
      />

      <WhatsAppButton phoneNumber={whatsappNumber} />
      <QuoteFloatingButton onClick={() => setIsQuoteFormOpen(true)} />
      
      <QuoteFormSidebar 
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </div>
  );

  // Wrap with DemoProvider if we have a demo slug
  if (demoSlug) {
    return <DemoProvider slug={demoSlug}>{content}</DemoProvider>;
  }

  return content;
}
