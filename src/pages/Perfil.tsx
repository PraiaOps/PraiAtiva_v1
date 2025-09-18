import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Perfil = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [showName, setShowName] = useState(user?.show_name ?? true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    bio: user?.bio || ''
  });

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Atualizar estado quando user mudar
  useEffect(() => {
    setShowName(user?.show_name ?? true);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      city: user?.city || '',
      bio: user?.bio || ''
    });
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não logado",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Atualizar dados do usuário no Supabase
      const { data, error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          bio: formData.bio,
          show_name: showName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        toast({
          title: "Erro",
          description: "Falha ao salvar alterações. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      // Atualizar contexto do usuário
      if (data) {
        setUser({
          ...user,
          name: data.name,
          phone: data.phone,
          city: data.city,
          bio: data.bio,
          show_name: data.show_name,
          updated_at: data.updated_at
        });
      }

      toast({
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso.",
        variant: "default"
      });

    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                      <span>{formData.phone || '(21) 99999-9999'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.city || 'Niterói, RJ'}</span>
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
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="seu@email.com"
                          disabled
                          className="opacity-60"
                        />
                        <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input 
                          id="city" 
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Niterói"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <textarea 
                        id="bio" 
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full min-h-[100px] p-3 border border-input rounded-md resize-none"
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>

                    {/* Privacy Settings - Mostrar para todos já que todos são instrutores */}
                      <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {showName ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                          Configurações de Privacidade
                        </h3>
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            id="show-name"
                            checked={showName}
                            onCheckedChange={(checked) => setShowName(checked as boolean)}
                          />
                          <Label htmlFor="show-name" className="text-sm">
                            Mostrar meu nome nos cards das atividades
                          </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {showName 
                            ? "Seu nome aparecerá como instrutor nas atividades que você criar."
                            : "Suas atividades mostrarão apenas 'Instrutor' ao invés do seu nome."
                          }
                        </p>
                      </div>

                    <div className="flex gap-4">
                      <Button 
                        variant="cta"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? "Salvando..." : "Salvar alterações"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setFormData({
                            name: user?.name || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                            city: user?.city || '',
                            bio: user?.bio || ''
                          });
                          setShowName(user?.show_name ?? true);
                        }}
                      >
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
      <Toaster />
    </div>
  );
};

export default Perfil;
