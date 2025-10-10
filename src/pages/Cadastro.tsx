import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SmoothScrollLink from "@/components/SmoothScrollLink";

const Cadastro = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    bio: "",
    role: "aluno" as "aluno" | "instrutor",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const emailRedirectTo = import.meta.env.VITE_APP_SITE_URL || window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo,
          data: {
            full_name: formData.name,
            role: formData.role,
            phone: formData.phone || null,
            bio: formData.bio || null,
          }
        }
      });

      if (error) {
        toast({ title: "Erro no cadastro", description: error.message, variant: "destructive" });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        setShowSuccessMessage(true);
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email e clique no link de confirmação para ativar sua conta.",
        });
      }

    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast({ title: "Erro", description: "Ocorreu um erro inesperado. Tente novamente.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Cadastro</CardTitle>
              <p className="text-muted-foreground">Crie sua conta para acessar funcionalidades exclusivas.</p>
            </CardHeader>
            <CardContent className="p-8">
              {showSuccessMessage ? (
                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <div className="flex justify-center items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Verifique seu Email</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-4">Enviamos um link de confirmação para o seu email. Por favor, clique no link para ativar sua conta.</p>
                  <p className="text-xs text-blue-600">Depois de confirmar, você poderá fazer login.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Seu nome completo" required disabled={isLoading} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" required disabled={isLoading} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Tipo de usuário *</Label>
                    <Select value={formData.role} onValueChange={(value: "aluno" | "instrutor") => setFormData(prev => ({ ...prev, role: value }))} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instrutor">Ofereço atividades na praia</SelectItem>
                        <SelectItem value="aluno">Busco atividades na praia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha *</Label>
                      <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" required disabled={isLoading} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                      <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" required disabled={isLoading} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="(21) 99999-9999" disabled={isLoading} />
                  </div>
                  {formData.role === 'instrutor' && (
                    <div className="space-y-2">
                      <Label htmlFor="bio">Apresentação profissional</Label>
                      <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Resuma suas qualificações profissionais" rows={4} disabled={isLoading} />
                    </div>
                  )}
                  <Button type="submit" variant="cta" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              )}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Já possui uma conta?{" "}
                  <SmoothScrollLink to="/login" className="text-primary hover:underline font-medium">
                    Faça login aqui
                  </SmoothScrollLink>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Cadastro;