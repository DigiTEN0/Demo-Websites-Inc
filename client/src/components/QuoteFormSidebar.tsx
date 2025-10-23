import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface QuoteFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteFormSidebar({ isOpen, onClose }: QuoteFormSidebarProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    name: "",
    email: "",
    phone: "",
    projectDetails: "",
  });
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Offerte aanvraag verzonden!",
        description: "We nemen binnen 24 uur contact met u op.",
      });
      onClose();
      setStep(1);
      setFormData({
        serviceType: "",
        name: "",
        email: "",
        phone: "",
        projectDetails: "",
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    submitMutation.mutate(formData);
  };

  const canProceed = () => {
    if (step === 1) return formData.serviceType !== "";
    if (step === 2) return formData.name && formData.email && formData.phone;
    return true;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-poppins text-foreground">
                Offerte Aanvragen
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Stap {step} van 3
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              data-testid="button-close-sidebar"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Step 1: Service Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold font-poppins mb-2">
                    Welke dienst heeft u nodig?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Selecteer het type werkzaamheden
                  </p>
                </div>

                <RadioGroup 
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <div className="space-y-3">
                    {["Dakbedekking", "Plat Dak", "Dakreparatie", "Dakisolatie", "Dakgoten", "Anders"].map((service) => (
                      <div 
                        key={service}
                        className="flex items-center space-x-3 p-4 rounded-lg border border-border hover-elevate"
                      >
                        <RadioGroupItem value={service} id={service} data-testid={`radio-${service.toLowerCase()}`} />
                        <Label htmlFor={service} className="flex-1 cursor-pointer text-base font-medium">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold font-poppins mb-2">
                    Uw contactgegevens
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Hoe kunnen wij u bereiken?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium mb-2 block">
                      Naam *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Uw volledige naam"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12"
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-medium mb-2 block">
                      E-mailadres *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="uw@email.nl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                      Telefoonnummer *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="06 12345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold font-poppins mb-2">
                    Projectdetails
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Vertel ons meer over uw project
                  </p>
                </div>

                <div>
                  <Label htmlFor="details" className="text-base font-medium mb-2 block">
                    Omschrijving van het project
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Beschrijf uw project zo gedetailleerd mogelijk: grootte van het dak, type woning, gewenste materialen, urgentie, etc."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    rows={8}
                    className="resize-none"
                    data-testid="textarea-details"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Hoe meer informatie u ons geeft, hoe beter wij u kunnen helpen.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="flex-1"
                  data-testid="button-previous"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Vorige
                </Button>
              )}
              
              {step < 3 ? (
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 font-poppins font-semibold"
                  data-testid="button-next"
                >
                  Volgende
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="flex-1 font-poppins font-semibold"
                  data-testid="button-submit-quote"
                >
                  {submitMutation.isPending ? "Verzenden..." : "Verstuur Aanvraag"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
