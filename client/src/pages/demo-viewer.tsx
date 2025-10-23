import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { DemoProvider } from "@/DemoContext";
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
import type { Demo } from "@shared/schema";

export default function DemoViewer() {
  const params = useParams();
  const slug = params.slug;
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  const { data: demo, isLoading, error } = useQuery<Demo>({
    queryKey: [`/api/demo/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Laden...</div>
      </div>
    );
  }

  if (error || !demo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground">Demo niet gevonden</p>
        </div>
      </div>
    );
  }

  return (
    <DemoProvider slug={slug}>
      <div className="min-h-screen bg-background">
        <Header 
          businessName={demo.businessName}
          logoText={demo.logoText}
          logoUrl={demo.logoUrl || undefined}
          onQuoteClick={() => setIsQuoteFormOpen(true)}
        />
        
        <Hero 
          businessName={demo.businessName}
          phoneNumber={demo.phoneNumber || "+31 6 12345678"}
        />
        
        <Services />
        
        <USPs businessName={demo.businessName} />
        
        <Reviews googleMapsReviewUrl={demo.googleMapsReviewUrl || undefined} />
        
        <FAQ />
        
        <FinalCTA onQuoteClick={() => setIsQuoteFormOpen(true)} />
        
        <Map address={demo.address || "Amsterdam, Nederland"} />
        
        <Footer 
          businessName={demo.businessName}
          logoText={demo.logoText}
          logoUrl={demo.logoUrl || undefined}
          email={demo.email || "info@dakdekker.nl"}
          phoneNumber={demo.phoneNumber || "+31 6 12345678"}
        />
        
        <WhatsAppButton phoneNumber={demo.whatsappNumber || "31612345678"} />
        
        <QuoteFloatingButton onClick={() => setIsQuoteFormOpen(true)} />
        
        <QuoteFormSidebar 
          isOpen={isQuoteFormOpen}
          onClose={() => setIsQuoteFormOpen(false)}
        />
      </div>
    </DemoProvider>
  );
}
