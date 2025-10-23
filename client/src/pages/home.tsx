import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { USPs } from "@/components/USPs";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Map } from "@/components/Map";
import { Footer } from "@/components/Footer";
import { QuoteFormSidebar } from "@/components/QuoteFormSidebar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QuoteFloatingButton } from "@/components/QuoteFloatingButton";
import type { SiteSettings } from "@shared/schema";

export default function Home() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ["/api/settings"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header 
        businessName={settings?.businessName || "BEDRIJFSNAAM"}
        logoText={settings?.logoText || "BEDRIJFSNAAM"}
        logoUrl={settings?.logoUrl}
        onQuoteClick={() => setIsQuoteFormOpen(true)}
      />
      
      <Hero 
        businessName={settings?.businessName || "BEDRIJFSNAAM"}
        phoneNumber={settings?.phoneNumber || "+31 6 12345678"}
      />
      
      <Services />
      
      <USPs businessName={settings?.businessName || "BEDRIJFSNAAM"} />
      
      <Reviews googleMapsReviewUrl={settings?.googleMapsReviewUrl} />
      
      <FAQ />
      
      <FinalCTA onQuoteClick={() => setIsQuoteFormOpen(true)} />
      
      <Map address={settings?.address || "Amsterdam, Nederland"} />
      
      <Footer 
        businessName={settings?.businessName || "BEDRIJFSNAAM"}
        logoText={settings?.logoText || "BEDRIJFSNAAM"}
        logoUrl={settings?.logoUrl}
        email={settings?.email || "info@dakdekker.nl"}
        phoneNumber={settings?.phoneNumber || "+31 6 12345678"}
      />
      
      <WhatsAppButton phoneNumber={settings?.whatsappNumber || "31612345678"} />
      
      <QuoteFloatingButton onClick={() => setIsQuoteFormOpen(true)} />
      
      <QuoteFormSidebar 
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />
    </div>
  );
}
