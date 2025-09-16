import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de login
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center bg-accent text-accent-foreground rounded-t-lg">
            <CardTitle className="text-2xl">Bem-vindo(a) de volta!</CardTitle>
            <p className="text-sm opacity-90">
              Acesse sua conta e continue sua jornada nas praias
            </p>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/esqueci-senha" className="text-sm text-accent hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />
              </div>
              
              <Button type="submit" variant="cta" className="w-full">
                Entrar
                <span className="ml-2">→</span>
              </Button>
            </form>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Acesso rápido para testes:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Entrar como Admin
                </Button>
                <Button variant="cta" size="sm" className="text-xs">
                  Entrar como Instrutor
                </Button>
                <Button variant="secondary" size="sm" className="text-xs">
                  Entrar como Aluno
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma conta?{" "}
                <Link to="/cadastro" className="text-accent hover:underline font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>
            
            <div className="text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Voltar para página inicial
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;