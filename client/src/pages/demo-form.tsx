import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Palette } from "lucide-react";
import { Link } from "wouter";
import type { Demo } from "@shared/schema";

export default function DemoForm() {
  const [, params] = useRoute("/dashboard/demos/:id/edit");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEdit = !!params?.id;

  const { data: demo } = useQuery<Demo>({
    queryKey: [`/api/demos/${params?.id}`],
    enabled: isEdit,
  });

  const [formData, setFormData] = useState({
    slug: "",
    businessName: "",
    logoText: "",
    logoUrl: "",
    phoneNumber: "+31 6 12345678",
    email: "info@dakdekker.nl",
    whatsappNumber: "31612345678",
    address: "Amsterdam, Nederland",
    googleMapsReviewUrl: "",
    primaryColor: "#0ea5e9",
  });

  // Update form data when demo is fetched
  useEffect(() => {
    if (demo) {
      setFormData({
        slug: demo.slug,
        businessName: demo.businessName,
        logoText: demo.logoText,
        logoUrl: demo.logoUrl || "",
        phoneNumber: demo.phoneNumber || "+31 6 12345678",
        email: demo.email || "info@dakdekker.nl",
        whatsappNumber: demo.whatsappNumber || "31612345678",
        address: demo.address || "Amsterdam, Nederland",
        googleMapsReviewUrl: demo.googleMapsReviewUrl || "",
        primaryColor: demo.primaryColor || "#0ea5e9",
      });
    }
  }, [demo]);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/demos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create demo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/demos"] });
      toast({
        title: "Demo aangemaakt",
        description: "De demo is succesvol aangemaakt",
      });
      navigate("/dashboard/demos");
    },
    onError: (error: Error) => {
      toast({
        title: "Fout",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`/api/demos/${params?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update demo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/demos"] });
      queryClient.invalidateQueries({ queryKey: [`/api/demos/${params?.id}`] });
      toast({
        title: "Demo bijgewerkt",
        description: "De demo is succesvol bijgewerkt",
      });
      navigate("/dashboard/demos");
    },
    onError: (error: Error) => {
      toast({
        title: "Fout",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleSlugChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData({ ...formData, slug });
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  if (isEdit && !demo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-600">Laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/demos">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Terug naar overzicht
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEdit ? "Demo Bewerken" : "Nieuwe Demo Maken"}
        </h1>
        <p className="text-gray-600 mb-8">
          {isEdit ? "Pas de instellingen van deze demo aan" : "Vul de gegevens in voor de nieuwe demo website"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basis Informatie</CardTitle>
              <CardDescription>
                Algemene bedrijfsgegevens voor de demo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="jan-dakwerken"
                  required
                  disabled={isEdit}
                />
                <p className="text-xs text-gray-500 mt-1">
                  demo.digiten.nl/<strong>{formData.slug || "slug"}</strong>
                  {isEdit && " (kan niet worden gewijzigd)"}
                </p>
              </div>

              <div>
                <Label htmlFor="businessName">Bedrijfsnaam *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Jan's Dakwerken"
                  required
                />
              </div>

              <div>
                <Label htmlFor="logoText">Logo Tekst *</Label>
                <Input
                  id="logoText"
                  value={formData.logoText}
                  onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                  placeholder="Jan's Dakwerken"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tekst die in de header wordt weergegeven
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Gegevens</CardTitle>
              <CardDescription>
                Contact informatie voor de demo website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Telefoonnummer</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+31 6 12345678"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mailadres</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@dakdekker.nl"
                />
              </div>

              <div>
                <Label htmlFor="whatsappNumber">WhatsApp Nummer</Label>
                <Input
                  id="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="31612345678"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Zonder + en spaties (bijv. 31612345678)
                </p>
              </div>

              <div>
                <Label htmlFor="address">Adres</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Amsterdam, Nederland"
                />
              </div>

              <div>
                <Label htmlFor="googleMapsReviewUrl">Google Maps Review URL</Label>
                <Input
                  id="googleMapsReviewUrl"
                  type="url"
                  value={formData.googleMapsReviewUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsReviewUrl: e.target.value })}
                  placeholder="https://g.page/..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design</CardTitle>
              <CardDescription>
                Pas de kleuren en stijl aan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primaryColor" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Primaire Kleur
                </Label>
                <div className="flex gap-3 items-center mt-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    placeholder="#0ea5e9"
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-end pt-4">
            <Link href="/dashboard/demos">
              <Button type="button" variant="outline">
                Annuleren
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Opslaan..." : (isEdit ? "Bijwerken" : "Demo Aanmaken")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
