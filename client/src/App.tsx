import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import DashboardLogin from "@/pages/dashboard-login";
import Dashboard from "@/pages/dashboard";
import ServiceDetail from "@/pages/service-detail";
import DemoManagement from "@/pages/demo-management";
import DemoForm from "@/pages/demo-form";
import DemoViewer from "@/pages/demo-viewer";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import type { SiteSettings, Demo } from "@shared/schema";

function hexToHSL(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 199, s: 89, l: 48 };
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function DemoColorLoader({ slug }: { slug: string }) {
  const { data: demo } = useQuery<Demo>({
    queryKey: [`/api/demo/${slug}`],
  });

  useEffect(() => {
    if (demo?.primaryColor) {
      const hsl = hexToHSL(demo.primaryColor);
      document.documentElement.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    }
  }, [demo?.primaryColor]);

  return null;
}

function Router() {
  const { data: settings, isLoading } = useQuery<SiteSettings>({
    queryKey: ["/api/settings"],
  });

  useEffect(() => {
    if (settings?.primaryColor) {
      const hsl = hexToHSL(settings.primaryColor);
      document.documentElement.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    }
  }, [settings?.primaryColor]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Laden...</div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={DashboardLogin} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/demos" component={DemoManagement} />
      <Route path="/dashboard/demos/new">
        {() => <DemoForm />}
      </Route>
      <Route path="/dashboard/demos/:id/edit">
        {() => <DemoForm />}
      </Route>
      <Route path="/diensten/:id" component={ServiceDetail} />
      <Route path="/:slug/diensten/:id">
        {(params) => (
          <>
            <DemoColorLoader slug={params.slug} />
            <ServiceDetail />
          </>
        )}
      </Route>
      <Route path="/:slug">
        {(params) => (
          <>
            <DemoColorLoader slug={params.slug} />
            <DemoViewer />
          </>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
