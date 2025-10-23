import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const heroImage = "https://images.squarespace-cdn.com/content/v1/593c208b46c3c411477414d4/550a3dee-2e6d-43f2-9988-cfc9b2615454/roofing+services.jpg";

interface HeroProps {
  businessName: string;
  phoneNumber: string;
}

export function Hero({ businessName, phoneNumber }: HeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Aanvraag verzonden!",
        description: "We nemen zo spoedig mogelijk contact met u op.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <section 
      className="relative min-h-[600px] md:min-h-[700px] flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-poppins mb-6 leading-tight">
              Professionele Dakdekker Diensten
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              {businessName} is uw betrouwbare partner voor alle dakwerkzaamheden. 
              Van nieuwbouw tot renovatie, wij leveren vakwerk van de hoogste kwaliteit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                variant="default"
                className="font-poppins font-semibold text-lg px-8"
                data-testid="button-hero-offerte"
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Gratis Offerte
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="font-poppins font-semibold text-lg px-8 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20"
                asChild
                data-testid="button-hero-bel"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Bel Direct
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Quick Contact Form */}
          <div className="bg-card/95 backdrop-blur-md p-6 md:p-8 rounded-xl border border-card-border shadow-2xl">
            <h3 className="text-2xl font-bold font-poppins mb-6 text-card-foreground">
              Vraag Direct een Offerte Aan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Naam *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background"
                data-testid="input-hero-name"
              />
              <Input
                type="tel"
                placeholder="Telefoonnummer *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-background"
                data-testid="input-hero-phone"
              />
              <Input
                type="email"
                placeholder="E-mailadres *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background"
                data-testid="input-hero-email"
              />
              <Textarea
                placeholder="Korte omschrijving van uw project"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-background"
                data-testid="textarea-hero-message"
              />
              <Button 
                type="submit" 
                className="w-full font-poppins font-semibold"
                disabled={submitMutation.isPending}
                data-testid="button-hero-submit"
              >
                {submitMutation.isPending ? "Verzenden..." : "Verstuur Aanvraag"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
