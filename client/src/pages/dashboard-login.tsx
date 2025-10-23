import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Home } from "lucide-react";
import { Link } from "wouter";

export default function DashboardLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (data: typeof credentials) => {
      return await apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: () => {
      toast({
        title: "Ingelogd!",
        description: "Welkom terug.",
      });
      setLocation("/dashboard");
    },
    onError: () => {
      toast({
        title: "Inloggen mislukt",
        description: "Controleer uw e-mailadres en wachtwoord.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <Home className="h-4 w-4" />
            Terug naar Website
          </Button>
        </Link>
        
        <Card className="w-full">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold font-poppins text-center">
              Dashboard Login
            </CardTitle>
            <CardDescription className="text-center">
              Beheer uw website instellingen
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                placeholder="info@digiten.nl"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                data-testid="input-login-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                data-testid="input-login-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-poppins font-semibold"
              disabled={loginMutation.isPending}
              data-testid="button-login"
            >
              {loginMutation.isPending ? "Inloggen..." : "Inloggen"}
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
