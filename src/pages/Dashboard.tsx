import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Clock, Waves, Trophy, Zap, Dumbbell, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useActivities } from "@/hooks/useActivities";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";
import velaImage from "@/assets/vela.jpg";
import circuitoFuncionalImage from "@/assets/circuito-funcional.jpg";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { activities, isLoading, createActivity, updateActivity, deleteActivity } = useActivities();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isNewActivityOpen, setIsNewActivityOpen] = useState(false);
  const [isEditActivityOpen, setIsEditActivityOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newActivity, setNewActivity] = useState({
    locationName: "",
    title: "",
    city: "",
    state: "RJ",
    beach: "",
    address: "",
    neighborhood: "",
    contact: "",
    socials: "",
    day: "",
    daysOfWeek: [] as string[],
    time: "",
    capacity: "",
    price: "",
    description: "",
  });


  const cities = [
    "Niterói",
    "Rio de Janeiro",
  ];

  const daysOfWeek = [
    "Segunda-feira",
    "Terça-feira", 
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo"
  ];

  // Praias baseadas nos dados reais da tabela (sem duplicatas)
  const beachesByCity = {
    "Niterói": [
      "Icaraí",
      "Charitas",
      "São Francisco", 
      "Camboinhas",
      "Gragoatá",
    ],
    "Rio de Janeiro": [
      // Por enquanto só Niterói tem atividades
    ],
  };

  const getAvailableBeaches = () => {
    if (!newActivity.city) return ["Outra"];
    const cityBeaches = beachesByCity[newActivity.city as keyof typeof beachesByCity] || [];
    return [...cityBeaches, "Outra"];
  };

  // Tipos de atividades baseados nos dados reais da tabela (sem duplicatas)
  const activityTypes = [
    "Beach Tennis",
    "Canoa Havaiana", 
    "Circuito Funcional",
    "Futevôlei",
    "Vela",
    "Vôlei de Praia"
  ];

  const getActivityIcon = (title: string) => {
    switch (title) {
      case "Beach Tennis":
        return <Target className="h-4 w-4 text-primary" />;
      case "Vôlei de Praia":
        return <Trophy className="h-4 w-4 text-primary" />;
      case "Futevôlei":
        return <Zap className="h-4 w-4 text-primary" />;
      case "Canoa Havaiana":
        return <Waves className="h-4 w-4 text-primary" />;
      case "Vela":
        return <Waves className="h-4 w-4 text-primary" />;
      case "Circuito Funcional":
        return <Dumbbell className="h-4 w-4 text-primary" />;
      default:
        return <Target className="h-4 w-4 text-primary" />;
    }
  };

  // Função para obter a imagem baseada no tipo de atividade
  const getActivityImage = (title: string) => {
    switch (title) {
      case "Beach Tennis":
        return beachtennisImage;
      case "Vôlei de Praia":
        return beachvolleyImage;
      case "Futevôlei":
        return futebolImage;
      case "Canoa Havaiana":
        return canoaImage;
      case "Vela":
        return velaImage;
      case "Circuito Funcional":
        return circuitoFuncionalImage;
      default:
        return beachvolleyImage;
    }
  };

  // Mostrar loading se o usuário ainda está sendo carregado
  // Loading apenas durante autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirecionar se não estiver logado (só depois de terminar o loading)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Acesso não autorizado</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar o dashboard.</p>
          <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se o usuário está carregado
    if (authLoading) {
      toast({
        title: "Aguarde",
        description: "Carregando dados do usuário...",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não está logado. Faça login novamente.",
        variant: "destructive",
      });
      return;
    }
    
    // Validar campos obrigatórios
    if (!newActivity.locationName || !newActivity.title || !newActivity.city || !newActivity.state || !newActivity.beach) {
      toast({
        title: "Erro",
        description: "Por favor, preencha os campos obrigatórios: Nome do local, Cidade, Estado, Tipo de Atividade e Praia.",
        variant: "destructive",
      });
      return;
    }

    try {
      const normalizeTime = (t?: string) => {
        if (!t) return null;
        const map: Record<string, string> = { 'manha': 'manhã', 'manhã': 'manhã', 'tarde': 'tarde', 'noite': 'noite' };
        return map[t] || null;
      };

      const activityData: any = {
        location_name: newActivity.locationName,
        title: newActivity.title as any,
        city: newActivity.city as any,
        state: newActivity.state,
        beach: newActivity.beach as any,
        address: newActivity.address === '' ? null : (newActivity.address || null),
        neighborhood: newActivity.neighborhood === '' ? null : (newActivity.neighborhood || null),
        contact: newActivity.contact === '' ? null : (newActivity.contact || null),
        socials: newActivity.socials === '' ? null : (newActivity.socials || null),
        date: newActivity.day ? newActivity.day as any : null,
        time: normalizeTime(newActivity.time),
        capacity: newActivity.capacity === '' ? null : (Number(newActivity.capacity) > 0 ? parseInt(newActivity.capacity) : null),
        price: newActivity.price === '' ? null : (newActivity.price ? parseFloat(newActivity.price) : null),
        description: newActivity.description || null,
        status: "active" as const,
        is_featured: false,
      };

      const result = await createActivity(activityData);
      
      if (result) {
        toast({
          title: "Sucesso",
          description: "Atividade criada com sucesso!",
        });
        
        // Fechar modal e limpar formulário
        setIsNewActivityOpen(false);
        setNewActivity({
          locationName: "",
          title: "",
          city: "",
          state: "RJ",
          beach: "",
          address: "",
          neighborhood: "",
          contact: "",
          socials: "",
          day: "",
          daysOfWeek: [],
          time: "",
          capacity: "",
          price: "",
          description: "",
        });
      } else {
        toast({
          title: "Erro",
          description: "Erro ao criar atividade. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar atividade.",
        variant: "destructive",
      });
    }
  };

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
    setNewActivity({
      locationName: activity.location_name || "",
      title: activity.title,
      city: activity.city || "",
      state: activity.state || "RJ",
      beach: activity.beach || "",
      address: activity.address || "",
      neighborhood: activity.neighborhood || "",
      contact: activity.contact || "",
      socials: activity.socials || "",
      day: activity.date || "",
      daysOfWeek: [],
      time: activity.time || "",
      capacity: activity.capacity != null ? String(activity.capacity) : "",
      price: activity.price != null ? String(activity.price) : "",
      description: activity.description || "",
    });
    setIsEditActivityOpen(true);
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!newActivity.locationName || !newActivity.title || !newActivity.city || !newActivity.state || !newActivity.beach) {
      toast({
        title: "Erro",
        description: "Por favor, preencha os campos obrigatórios: Nome do local, Cidade, Estado, Tipo de Atividade e Praia.",
        variant: "destructive",
      });
      return;
    }

    try {
      const normalizeTime = (t?: string) => {
        if (!t) return undefined;
        const map: Record<string, string> = { 'manha': 'manhã', 'manhã': 'manhã', 'tarde': 'tarde', 'noite': 'noite' };
        return map[t] || undefined;
      };

      const rawData: any = {
        location_name: newActivity.locationName,
        title: newActivity.title as any,
        city: newActivity.city as any,
        state: newActivity.state,
        beach: newActivity.beach as any,
        address: newActivity.address === '' ? null : (newActivity.address || undefined),
        neighborhood: newActivity.neighborhood === '' ? null : (newActivity.neighborhood || undefined),
        contact: newActivity.contact === '' ? null : (newActivity.contact || undefined),
        socials: newActivity.socials === '' ? null : (newActivity.socials || undefined),
        // Opcionais: null apaga, undefined mantém
        date: newActivity.day === '' ? null : (newActivity.day ? (newActivity.day as any) : undefined),
        time: newActivity.time === '' ? null : normalizeTime(newActivity.time),
        capacity: newActivity.capacity === '' ? null : (Number(newActivity.capacity) > 0 ? parseInt(newActivity.capacity) : null),
        price: newActivity.price === '' ? null : (newActivity.price ? parseFloat(newActivity.price) : undefined),
        description: newActivity.description || undefined,
      };

      // Remover chaves undefined para evitar 400 do PostgREST
      const activityData = Object.fromEntries(Object.entries(rawData).filter(([_, v]) => v !== undefined));

      const result = await updateActivity(editingActivity.id, activityData);
      
      if (result) {
        toast({
          title: "Sucesso",
          description: "Atividade atualizada com sucesso!",
        });
        
        // Fechar modal e limpar formulário
        setIsEditActivityOpen(false);
        setEditingActivity(null);
        setNewActivity({
          locationName: "",
          title: "",
          city: "",
          state: "RJ",
          beach: "",
          address: "",
          neighborhood: "",
          contact: "",
          socials: "",
          day: "",
          daysOfWeek: [],
          time: "",
          capacity: "",
          price: "",
          description: "",
        });
      } else {
        toast({
          title: "Erro",
          description: "Erro ao atualizar atividade. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao atualizar atividade.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta atividade?")) {
      try {
        const success = await deleteActivity(activityId);
        
        if (success) {
          toast({
            title: "Sucesso",
            description: "Atividade excluída com sucesso!",
          });
        } else {
          toast({
            title: "Erro",
            description: "Erro ao excluir atividade. Tente novamente.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        toast({
          title: "Erro",
          description: "Erro inesperado ao excluir atividade.",
          variant: "destructive",
        });
      }
    }
  };

  // destaque removido

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-cta rounded-full flex items-center justify-center">
              <span className="font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Painel do Instrutor</h1>
              <p className="text-sm opacity-90">{user?.name || 'Usuário'} - {user?.role === 'instrutor' ? 'Instrutor' : user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
            </div>
          </div>
          {/* Botão de notificações removido */}
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-cta text-cta-foreground md:min-h-screen p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover bg-cta-hover">
              <Users className="mr-3 h-4 w-4" />
              Minhas Atividades
            </Button>
            <Link to="/perfil">
              <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover">
                <Users className="mr-3 h-4 w-4" />
                Perfil
              </Button>
            </Link>
            <div className="pt-4 border-t border-cta-hover">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover">
                  ← Voltar ao site
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 md:mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary">Minhas Atividades</h1>
                <p className="text-muted-foreground">Gerencie suas aulas e atividades</p>
              </div>
              
              <Dialog open={isNewActivityOpen} onOpenChange={setIsNewActivityOpen}>
                <DialogTrigger asChild>
                  <Button variant="cta" size="sm">
                    <Plus className="mr-2 h-5 w-5" />
                    Nova Atividade
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:w-full max-w-3xl max-h-[85vh] overflow-y-auto p-4 md:p-6">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Atividade</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateActivity} className="space-y-6">
                    <div className="text-xs text-muted-foreground">Campos obrigatórios estão marcados com *</div>
                    <div className="space-y-2">
                      <Label htmlFor="location-name">Nome do local de atuação *</Label>
                      <Input
                        id="location-name"
                        type="text"
                        value={newActivity.locationName}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, locationName: e.target.value }))}
                        placeholder="Ex: Academia de Beach Tennis Icaraí"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Localização</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Select 
                          value={newActivity.city} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, city: value, beach: "" }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a cidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Select 
                          value={newActivity.state}
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, state: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RJ">RJ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="activity-type">Tipo de Atividade *</Label>
                        <Select 
                          value={newActivity.title} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, title: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityTypes.map(activity => (
                              <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Endereço</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="beach">Praia *</Label>
                        <Select 
                          value={newActivity.beach} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, beach: value }))}
                          disabled={!newActivity.city}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={newActivity.city ? "Selecione a praia" : "Primeiro selecione a cidade"} />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableBeaches().map(beach => (
                              <SelectItem key={beach} value={beach}>{beach}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          type="text"
                          value={newActivity.address}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Ex: Avenida Roberto Silveira, 123"
                        />
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Informações adicionais</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          type="text"
                          value={newActivity.neighborhood}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, neighborhood: e.target.value }))}
                          placeholder="Ex: Icaraí"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact">Contato (WhatsApp, telefone ou link)</Label>
                        <Input
                          id="contact"
                          type="text"
                          value={newActivity.contact}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, contact: e.target.value }))}
                          placeholder="Ex: (21) 99999-9999 ou https://..."
                        />
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Horários</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="day">Dia da Semana</Label>
                        <Select 
                          value={newActivity.day}
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, day: value === '__none__' ? '' : value }))}
                        >
                          <SelectTrigger id="day" className="w-full">
                            <SelectValue placeholder="Selecione o dia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">Limpar seleção</SelectItem>
                            {daysOfWeek.map((day) => (
                              <SelectItem key={day} value={day}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Horário</Label>
                        <Select 
                          value={newActivity.time}
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, time: value === '__none__' ? '' : value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">Limpar seleção</SelectItem>
                            <SelectItem value="manha">Manhã</SelectItem>
                            <SelectItem value="tarde">Tarde</SelectItem>
                            <SelectItem value="noite">Noite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Capacidade e Preço</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Vagas</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newActivity.capacity}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, capacity: e.target.value }))}
                          placeholder="Número máximo de participantes"
                          min="1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newActivity.price}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t space-y-2">
                      <h4 className="text-sm font-semibold mb-1">Descrição</h4>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detalhes sobre a atividade..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="socials">Redes sociais (links ou @handles)</Label>
                      <Input
                        id="socials"
                        type="text"
                        value={newActivity.socials}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, socials: e.target.value }))}
                        placeholder="Ex: https://instagram.com/suaacademia; @seuperfil"
                      />
                    </div>
                    
                    <div className="flex flex-col-reverse md:flex-row gap-2 md:justify-end">
                      <Button type="button" variant="outline" onClick={() => setIsNewActivityOpen(false)} className="w-full md:w-auto">
                        Cancelar
                      </Button>
                      <Button type="submit" variant="cta" className="w-full md:w-auto">
                        Criar Atividade
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Edit Activity Dialog */}
              <Dialog open={isEditActivityOpen} onOpenChange={setIsEditActivityOpen}>
                <DialogContent className="w-[95vw] sm:w-full max-w-3xl max-h-[85vh] overflow-y-auto p-4 md:p-6">
                  <DialogHeader>
                    <DialogTitle>Editar Atividade</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateActivity} className="space-y-6">
                    <div className="text-xs text-muted-foreground">Campos obrigatórios estão marcados com *</div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-location-name">Nome do local de atuação *</Label>
                      <Input
                        id="edit-location-name"
                        type="text"
                        value={newActivity.locationName}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, locationName: e.target.value }))}
                        placeholder="Ex: Academia de Beach Tennis Icaraí"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Localização</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-city">Cidade *</Label>
                        <Select value={newActivity.city} onValueChange={(value) => setNewActivity(prev => ({ ...prev, city: value, beach: "" }))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a cidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-state">Estado *</Label>
                        <Select value={newActivity.state} onValueChange={(value) => setNewActivity(prev => ({ ...prev, state: value }))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RJ">RJ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="edit-activity-type">Tipo de Atividade *</Label>
                        <Select value={newActivity.title} onValueChange={(value) => setNewActivity(prev => ({ ...prev, title: value }))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityTypes.map(activity => (
                              <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Endereço</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-beach">Praia *</Label>
                        <Select value={newActivity.beach} onValueChange={(value) => setNewActivity(prev => ({ ...prev, beach: value }))} disabled={!newActivity.city}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={newActivity.city ? "Selecione a praia" : "Primeiro selecione a cidade"} />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableBeaches().map(beach => (
                              <SelectItem key={beach} value={beach}>{beach}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-address">Endereço</Label>
                        <Input id="edit-address" type="text" value={newActivity.address} onChange={(e) => setNewActivity(prev => ({ ...prev, address: e.target.value }))} placeholder="Ex: Avenida Roberto Silveira, 123" />
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Informações adicionais</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-neighborhood">Bairro</Label>
                        <Input id="edit-neighborhood" type="text" value={newActivity.neighborhood} onChange={(e) => setNewActivity(prev => ({ ...prev, neighborhood: e.target.value }))} placeholder="Ex: Icaraí" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-contact">Contato (WhatsApp, telefone ou link)</Label>
                        <Input id="edit-contact" type="text" value={newActivity.contact} onChange={(e) => setNewActivity(prev => ({ ...prev, contact: e.target.value }))} placeholder="Ex: (21) 99999-9999 ou https://..." />
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Horários</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-day">Dia da Semana</Label>
                        <Select value={newActivity.day} onValueChange={(value) => setNewActivity(prev => ({ ...prev, day: value === '__none__' ? '' : value }))}>
                          <SelectTrigger id="edit-day" className="w-full">
                            <SelectValue placeholder="Selecione o dia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">Limpar seleção</SelectItem>
                            {daysOfWeek.map((d) => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-time">Horário</Label>
                        <Select value={newActivity.time} onValueChange={(value) => setNewActivity(prev => ({ ...prev, time: value === '__none__' ? '' : value }))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__none__">Limpar seleção</SelectItem>
                            <SelectItem value="manhã">Manhã (6h-12h)</SelectItem>
                            <SelectItem value="tarde">Tarde (12h-18h)</SelectItem>
                            <SelectItem value="noite">Noite (18h-22h)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">Capacidade e Preço</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-capacity">Capacidade Máxima</Label>
                        <Input id="edit-capacity" type="number" value={newActivity.capacity} onChange={(e) => setNewActivity(prev => ({ ...prev, capacity: e.target.value }))} placeholder="Ex: 10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-price">Preço (R$)</Label>
                        <Input id="edit-price" type="number" step="0.01" min="0" value={newActivity.price} onChange={(e) => setNewActivity(prev => ({ ...prev, price: e.target.value }))} placeholder="Ex: 25.00 (0 para gratuito)" />
                      </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t space-y-2">
                      <h4 className="text-sm font-semibold mb-1">Descrição</h4>
                      <Label htmlFor="edit-description">Descrição</Label>
                      <Textarea id="edit-description" value={newActivity.description} onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))} placeholder="Descreva a atividade..." rows={3} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-socials">Redes sociais (links ou @handles)</Label>
                      <Input id="edit-socials" type="text" value={newActivity.socials} onChange={(e) => setNewActivity(prev => ({ ...prev, socials: e.target.value }))} placeholder="Ex: https://instagram.com/suaacademia; @seuperfil" />
                    </div>
                    
                    <div className="flex flex-col-reverse md:flex-row gap-2 md:justify-end">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditActivityOpen(false)}
                        className="w-full md:w-auto"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" variant="cta" className="w-full md:w-auto">
                        Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Atividades Ativas</p>
                      <p className="text-2xl font-bold text-primary">{activities.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Inscrições</p>
                <p className="text-2xl font-bold text-primary">
                  {activities.reduce((total, activity) => total + activity.enrollments, 0)}
                </p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
            </div>

            {/* Activities List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {isLoading ? (
                <div className="col-span-2">
                  <Card className="text-center p-12">
                    <CardContent>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Carregando atividades...</p>
                    </CardContent>
                  </Card>
                </div>
              ) : activities.length === 0 ? (
                <div className="col-span-2">
                  <Card className="text-center p-12">
                    <CardContent>
                      <div className="text-6xl mb-4">🏖️</div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        Nenhuma atividade cadastrada
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Comece criando sua primeira atividade para gerenciar suas aulas na praia.
                      </p>
                      <Button 
                        variant="cta" 
                        onClick={() => setIsNewActivityOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Primeira Atividade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                (() => {
                  const itemsPerPage = isMobile ? 4 : 6;
                  const totalPages = Math.ceil(activities.length / itemsPerPage) || 1;
                  const safeCurrent = Math.min(currentPage, totalPages);
                  const startIndex = (safeCurrent - 1) * itemsPerPage;
                  const endIndex = startIndex + itemsPerPage;
                  const pageItems = activities.slice(startIndex, endIndex);

                  return pageItems.map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={getActivityImage(activity.title)} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <Badge className="absolute top-2 left-2 bg-primary">
                      {activity.status === 'active' ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{activity.location_name}</h3>
                        <p className="text-sm text-muted-foreground">{activity.beach}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          {getActivityIcon(activity.title)}
                          <span>{activity.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{activity.date}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditActivity(activity)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleDeleteActivity(activity.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  ));
                })()
              )}
            </div>

            {/* Pagination Controls */}
            {!isLoading && activities.length > 0 && (
              (() => {
                const itemsPerPage = isMobile ? 4 : 6;
                const totalPages = Math.ceil(activities.length / itemsPerPage) || 1;
                const safeCurrent = Math.min(currentPage, totalPages);
                const startIndex = (safeCurrent - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, activities.length);

                if (currentPage !== safeCurrent) {
                  setCurrentPage(safeCurrent);
                }

                return (
                  <div className="flex flex-col items-center mt-6 md:mt-8 space-y-3">
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Mostrando {startIndex + 1} a {endIndex} de {activities.length} atividades
                    </p>
                    <div className={`flex ${isMobile ? 'w-full justify-between' : 'items-center space-x-2'}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className={isMobile ? 'flex-1 mr-2' : ''}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={safeCurrent === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-1 hidden md:inline">Anterior</span>
                      </Button>

                      {!isMobile && (
                        <div className="flex space-x-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                            const shouldShow = page === 1 || page === totalPages || (page >= safeCurrent - 1 && page <= safeCurrent + 1);
                            if (!shouldShow) {
                              if (page === safeCurrent - 2 && safeCurrent > 3) return <span key={page} className="px-2 text-muted-foreground">...</span>;
                              if (page === safeCurrent + 2 && safeCurrent < totalPages - 2) return <span key={page} className="px-2 text-muted-foreground">...</span>;
                              return null;
                            }
                            return (
                              <Button
                                key={page}
                                variant={safeCurrent === page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-10 h-9"
                              >
                                {page}
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className={isMobile ? 'flex-1 ml-2' : ''}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={safeCurrent === totalPages}
                      >
                        <span className="mr-1 hidden md:inline">Próxima</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;