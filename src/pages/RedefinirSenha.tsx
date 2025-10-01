import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { supabase } from "@/lib/supabase";

const RedefinirSenha = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canReset, setCanReset] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const hash = window.location.hash;

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          if (mounted) setCanReset(true);
          return;
        }

        if (hash.includes("type=recovery")) {
          if (mounted) setCanReset(true);
          return;
        }

        // Fallback: escutar evento de recuperação
        const { data } = supabase.auth.onAuthStateChange((event) => {
          if (event === "PASSWORD_RECOVERY") {
            if (mounted) setCanReset(true);
          }
        });

        return () => {
          data.subscription.unsubscribe();
        };
      } catch (error) {
        // Ignorar e deixar o usuário tentar mesmo assim
        if (mounted) setCanReset(true);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter ao menos 6 caracteres.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      toast({ title: "Sucesso", description: "Senha redefinida com sucesso." });
      setTimeout(() => navigate("/login"), 600);
    } catch (error: any) {
      toast({ title: "Erro", description: error?.message || "Não foi possível redefinir a senha.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center bg-accent text-accent-foreground rounded-t-lg">
            <CardTitle className="text-2xl">Redefinir senha</CardTitle>
            <p className="text-sm opacity-90">Defina uma nova senha para sua conta</p>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {!canReset ? (
              <p className="text-center text-sm text-muted-foreground">
                Validando link de recuperação...
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••"
                    required
                  />
                </div>
                <Button type="submit" variant="cta" className="w-full" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Redefinir senha"}
                </Button>
              </form>
            )}
            <div className="text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                ← Voltar ao login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default RedefinirSenha;


