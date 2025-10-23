import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, ExternalLink, Edit, Trash2, Copy, Search, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import type { Demo } from "@shared/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DemoManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: demos, isLoading } = useQuery<Demo[]>({
    queryKey: ["/api/demos"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/demos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete demo");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/demos"] });
      toast({
        title: "Demo verwijderd",
        description: "De demo is succesvol verwijderd",
      });
      setDeleteId(null);
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het verwijderen van de demo",
        variant: "destructive",
      });
    },
  });

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link gekopieerd",
      description: "De demo link is gekopieerd naar je klembord",
    });
  };

  const handlePreview = (slug: string) => {
    window.open(`/${slug}`, "_blank");
  };

  const filteredDemos = demos?.filter((demo) =>
    demo.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    demo.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Terug naar Dashboard
          </Button>
        </Link>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Demo Beheer</h1>
            <p className="text-gray-600 mt-1">
              Beheer al je demo websites op één plek
            </p>
          </div>
          <Link href="/dashboard/demos/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nieuwe Demo
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Zoek op bedrijfsnaam of slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center text-gray-500">
              Laden...
            </CardContent>
          </Card>
        ) : !filteredDemos || filteredDemos.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto mb-3" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Geen demo's gevonden
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? "Probeer een andere zoekopdracht" : "Maak je eerste demo aan om te beginnen"}
              </p>
              {!searchQuery && (
                <Link href="/dashboard/demos/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nieuwe Demo Maken
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredDemos.map((demo) => (
              <Card key={demo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {demo.businessName}
                      </CardTitle>
                      <CardDescription className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="font-mono">
                            /{demo.slug}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Aangemaakt {formatDistanceToNow(new Date(demo.createdAt), { 
                              addSuffix: true,
                              locale: nl 
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {demo.email} • {demo.phoneNumber}
                        </div>
                      </CardDescription>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full border-2 flex-shrink-0"
                      style={{ backgroundColor: demo.primaryColor, borderColor: demo.primaryColor }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(demo.slug)}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyLink(demo.slug)}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Kopieer Link
                    </Button>
                    <Link href={`/dashboard/demos/${demo.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Bewerken
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteId(demo.id)}
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Verwijderen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Deze actie kan niet ongedaan worden gemaakt. De demo zal permanent verwijderd worden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
