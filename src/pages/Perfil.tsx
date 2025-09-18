import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const Perfil = () => {
  const { user } = useAuth();

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meu Perfil</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Gerencie suas informações pessoais
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl text-primary-foreground font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{user?.name || 'Usuário'}</CardTitle>
                    <p className="text-muted-foreground capitalize">
                      {user?.role === 'instrutor' ? 'Instrutor' : 
                       user?.role === 'admin' ? 'Administrador' : 'Aluno'}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user?.email || 'email@exemplo.com'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>(21) 99999-9999</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Niterói, RJ</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Membro desde Jan 2025</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input 
                          id="name" 
                          defaultValue={user?.name || ''} 
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={user?.email || ''} 
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input 
                          id="city" 
                          placeholder="Niterói"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <textarea 
                        id="bio" 
                        className="w-full min-h-[100px] p-3 border border-input rounded-md resize-none"
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button variant="cta">
                        Salvar alterações
                      </Button>
                      <Button variant="outline">
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Dashboard */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              ← Voltar ao Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Perfil;
