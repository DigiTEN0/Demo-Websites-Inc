import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Settings, Home, LogOut, Presentation } from "lucide-react";
import { Link as WouterLink } from "wouter";
import type { SiteSettings } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [formData, setFormData] = useState({
    businessName: "",
    logoText: "",
    logoUrl: "",
    phoneNumber: "",
    email: "",
    whatsappNumber: "",
    address: "",
    googleMapsReviewUrl: "",
    primaryColor: "#0ea5e9",
  });

  const { data: settings, isLoading } = useQuery<SiteSettings>({
    queryKey: ["/api/settings"],
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        businessName: settings.businessName,
        logoText: settings.logoText,
        logoUrl: settings.logoUrl || "",
        phoneNumber: settings.phoneNumber || "",
        email: settings.email || "",
        whatsappNumber: settings.whatsappNumber || "",
        address: settings.address || "",
        googleMapsReviewUrl: settings.googleMapsReviewUrl || "",
        primaryColor: settings.primaryColor || "#0ea5e9",
      });
      setLogoPreview(settings.logoUrl || "");
    }
  }, [settings]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("logo", file);
      
      const response = await fetch("/api/upload/logo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload logo");
      }

      return await response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("PUT", "/api/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Instellingen opgeslagen!",
        description: "De wijzigingen zijn doorgevoerd op de website.",
      });
    },
    onError: () => {
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let updatedFormData = { ...formData };
      
      // Upload logo if a new file is selected
      if (logoFile) {
        const uploadResult = await uploadLogoMutation.mutateAsync(logoFile);
        updatedFormData.logoUrl = uploadResult.logoUrl;
      }
      
      updateMutation.mutate(updatedFormData);
    } catch (error) {
      toast({
        title: "Logo upload mislukt",
        description: "Probeer het opnieuw met een ander bestand.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-poppins text-foreground">
              Website Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <WouterLink href="/dashboard/demos">
                <Button variant="default">
                  <Presentation className="mr-2 h-4 w-4" />
                  Demo Beheer
                </Button>
              </WouterLink>
              <Button 
                variant="outline" 
                asChild
                data-testid="button-view-website"
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Home className="mr-2 h-4 w-4" />
                  Bekijk Website
                </a>
              </Button>
              <Button 
                variant="ghost"
                asChild
                data-testid="button-logout"
              >
                <a href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Uitloggen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-poppins mb-2">
            Website Instellingen
          </h2>
          <p className="text-muted-foreground">
            Pas de bedrijfsnaam en logo aan. Wijzigingen worden direct doorgevoerd op de hele website.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-poppins">
                  Algemene Instellingen
                </CardTitle>
                <CardDescription>
                  Deze instellingen worden gebruikt op de gehele website
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-10 bg-muted animate-pulse rounded" />
                <div className="h-10 bg-muted animate-pulse rounded" />
                <div className="h-10 bg-muted animate-pulse rounded" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-base font-semibold">
                    Bedrijfsnaam *
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Bijv: Dakdekkersbedrijf Jansen"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    required
                    data-testid="input-business-name"
                  />
                  <p className="text-sm text-muted-foreground">
                    Deze naam wordt gebruikt in de hele website teksten
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoText" className="text-base font-semibold">
                    Logo Tekst *
                  </Label>
                  <Input
                    id="logoText"
                    placeholder="Bijv: JANSEN DAKDEKKERS"
                    value={formData.logoText}
                    onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                    required
                    data-testid="input-logo-text"
                  />
                  <p className="text-sm text-muted-foreground">
                    Deze tekst wordt getoond als logo in de header en footer (als er geen logo afbeelding is)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoFile" className="text-base font-semibold">
                    Logo Afbeelding (optioneel)
                  </Label>
                  <Input
                    id="logoFile"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                    onChange={handleLogoChange}
                    data-testid="input-logo-file"
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload uw logo (PNG, JPG, SVG of WebP, max 5MB). Het logo wordt gebruikt in plaats van de logo tekst.
                  </p>
                  {logoPreview && (
                    <div className="mt-2 p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold">Huidige logo:</p>
                        {formData.logoUrl && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setLogoFile(null);
                              setLogoPreview("");
                              setFormData({ ...formData, logoUrl: "" });
                            }}
                          >
                            Verwijder
                          </Button>
                        )}
                      </div>
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">Website Kleuren</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor" className="text-base font-semibold">
                        Primaire Kleur
                      </Label>
                      <div className="flex gap-3 items-center">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="w-20 h-12 cursor-pointer"
                          data-testid="input-primary-color"
                        />
                        <Input
                          type="text"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          placeholder="#0ea5e9"
                          className="flex-1"
                          pattern="^#[0-9A-Fa-f]{6}$"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Deze kleur wordt gebruikt voor knoppen, accenten en andere primaire elementen op de website.
                      </p>
                      <div className="mt-3 p-4 bg-muted rounded-lg">
                        <p className="text-sm font-semibold mb-3">Voorbeeld:</p>
                        <div className="flex flex-wrap gap-2">
                          <div 
                            className="px-4 py-2 rounded-md text-white font-semibold"
                            style={{ backgroundColor: formData.primaryColor }}
                          >
                            Voorbeeld Knop
                          </div>
                          <div 
                            className="px-4 py-2 rounded-md border-2 font-semibold"
                            style={{ 
                              borderColor: formData.primaryColor,
                              color: formData.primaryColor
                            }}
                          >
                            Voorbeeld Outline
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">Contactgegevens</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">
                        Telefoonnummer
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+31 6 12345678"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        data-testid="input-phone-number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        E-mailadres
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@dakdekker.nl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsappNumber">
                        WhatsApp Nummer
                      </Label>
                      <Input
                        id="whatsappNumber"
                        placeholder="31612345678 (zonder +)"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        data-testid="input-whatsapp-number"
                      />
                      <p className="text-sm text-muted-foreground">
                        Vul in zonder + of spaties (bijv: 31612345678)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Bedrijfsadres
                      </Label>
                      <Input
                        id="address"
                        placeholder="Straatnaam 123, 1234 AB Amsterdam"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        data-testid="input-address"
                      />
                      <p className="text-sm text-muted-foreground">
                        Dit adres wordt getoond op de kaart onderaan de website
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="googleMapsReviewUrl">
                        Google Maps Reviews Link
                      </Label>
                      <Input
                        id="googleMapsReviewUrl"
                        type="url"
                        placeholder="https://maps.app.goo.gl/..."
                        value={formData.googleMapsReviewUrl}
                        onChange={(e) => setFormData({ ...formData, googleMapsReviewUrl: e.target.value })}
                        data-testid="input-google-maps-review-url"
                      />
                      <p className="text-sm text-muted-foreground">
                        Plak de link naar uw Google Maps bedrijfspagina (met reviews). Dit wordt gebruikt voor de "Bekijk alle reviews" knop.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6">
                  <Button
                    type="submit"
                    className="font-poppins font-semibold"
                    disabled={updateMutation.isPending}
                    data-testid="button-save-settings"
                  >
                    {updateMutation.isPending ? "Opslaan..." : "Wijzigingen Opslaan"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => settings && setFormData({
                      businessName: settings.businessName,
                      logoText: settings.logoText,
                      logoUrl: settings.logoUrl || "",
                      phoneNumber: settings.phoneNumber || "",
                      email: settings.email || "",
                      whatsappNumber: settings.whatsappNumber || "",
                      address: settings.address || "",
                      googleMapsReviewUrl: settings.googleMapsReviewUrl || "",
                      primaryColor: settings.primaryColor || "#0ea5e9",
                    })}
                    data-testid="button-reset"
                  >
                    Herstel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Preview Info */}
        <Card className="mt-6 bg-accent/30 border-accent">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Open de website in een nieuw tabblad om de wijzigingen direct te zien. 
              Alle aanpassingen worden automatisch doorgevoerd op de gehele website.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
