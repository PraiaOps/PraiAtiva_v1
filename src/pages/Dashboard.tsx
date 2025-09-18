import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Users, Calendar, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useActivities } from "@/hooks/useActivities";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { activities, isLoading, createActivity, updateActivity, deleteActivity } = useActivities();
  const { toast } = useToast();
  const [isNewActivityOpen, setIsNewActivityOpen] = useState(false);
  const [isEditActivityOpen, setIsEditActivityOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [newActivity, setNewActivity] = useState({
    title: "",
    beach: "",
    date: "",
    time: "",
    capacity: "",
    price: "",
    description: "",
  });


  const beaches = [
    "Icaraí",
    "Copacabana",
    "Piratininga", 
    "Camboinhas",
    "Itaipu",
    "São Francisco",
  ];

  const activityTypes = [
    "Beach Volley",
    "Beach Tennis", 
    "Futebol",
    "Canoa Havaiana",
  ];

  // Função para obter a imagem baseada no tipo de atividade
  const getActivityImage = (title: string) => {
    const activityTitle = title.toLowerCase();
    
    if (activityTitle.includes('beach volley') || activityTitle.includes('volley') || activityTitle.includes('vôlei')) {
      return beachvolleyImage;
    } else if (activityTitle.includes('beach tennis') || activityTitle.includes('tennis')) {
      return beachtennisImage;
    } else if (activityTitle.includes('futebol') || activityTitle.includes('football')) {
      return futebolImage;
    } else if (activityTitle.includes('canoa') || activityTitle.includes('havaiana') || activityTitle.includes('paddle')) {
      return canoaImage;
    } else {
      // Imagem padrão se não encontrar correspondência
      return beachvolleyImage;
    }
  };

  // Mostrar loading se o usuário ainda está sendo carregado
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  // Redirecionar se não estiver logado
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
    if (!newActivity.title || !newActivity.beach || !newActivity.date || !newActivity.time || !newActivity.capacity || !newActivity.price) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      const activityData = {
        title: newActivity.title,
        beach: `${newActivity.beach}, Niterói`,
        date: newActivity.date,
        time: newActivity.time as "manhã" | "tarde" | "noite",
        capacity: parseInt(newActivity.capacity),
        price: parseFloat(newActivity.price),
        description: newActivity.description || null,
        status: "active" as const,
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
          title: "",
          beach: "",
          date: "",
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
      title: activity.title,
      beach: activity.beach.replace(", Niterói", ""),
      date: activity.date,
      time: activity.time,
      capacity: activity.capacity.toString(),
      price: activity.price.toString(),
      description: activity.description || "",
    });
    setIsEditActivityOpen(true);
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!newActivity.title || !newActivity.beach || !newActivity.date || !newActivity.time || !newActivity.capacity || !newActivity.price) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    try {
      const activityData = {
        title: newActivity.title,
        beach: `${newActivity.beach}, Niterói`,
        date: newActivity.date,
        time: newActivity.time as "manhã" | "tarde" | "noite",
        capacity: parseInt(newActivity.capacity),
        price: parseFloat(newActivity.price),
        description: newActivity.description || null,
      };

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
          title: "",
          beach: "",
          date: "",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-cta rounded-full flex items-center justify-center">
              <span className="font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Painel do Instrutor</h1>
              <p className="text-sm opacity-90">{user?.name || 'Usuário'} - {user?.role === 'instrutor' ? 'Instrutor' : user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
            </div>
          </div>
          <Button variant="cta" size="sm">
            🔔 Notificações
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-cta text-cta-foreground min-h-screen p-4">
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
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary">Minhas Atividades</h1>
                <p className="text-muted-foreground">Gerencie suas aulas e atividades</p>
              </div>
              
              <Dialog open={isNewActivityOpen} onOpenChange={setIsNewActivityOpen}>
                <DialogTrigger asChild>
                  <Button variant="cta" size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Nova Atividade
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Atividade</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateActivity} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="activity-type">Tipo de Atividade *</Label>
                        <Select 
                          value={newActivity.title} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, title: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityTypes.map(activity => (
                              <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="beach">Praia *</Label>
                        <Select 
                          value={newActivity.beach} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, beach: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {beaches.map(beach => (
                              <SelectItem key={beach} value={beach}>{beach}, Niterói</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Data *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newActivity.date}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Horário *</Label>
                        <Select 
                          value={newActivity.time} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, time: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manha">Manhã</SelectItem>
                            <SelectItem value="tarde">Tarde</SelectItem>
                            <SelectItem value="noite">Noite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Vagas *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newActivity.capacity}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, capacity: e.target.value }))}
                          placeholder="Número máximo de participantes"
                          min="1"
                          required
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detalhes sobre a atividade..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button type="button" variant="outline" onClick={() => setIsNewActivityOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" variant="cta">
                        Criar Atividade
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Edit Activity Dialog */}
              <Dialog open={isEditActivityOpen} onOpenChange={setIsEditActivityOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Editar Atividade</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateActivity} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-activity-type">Tipo de Atividade *</Label>
                        <Select 
                          value={newActivity.title} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, title: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityTypes.map(activity => (
                              <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-beach">Praia *</Label>
                        <Select 
                          value={newActivity.beach} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, beach: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {beaches.map(beach => (
                              <SelectItem key={beach} value={beach}>{beach}, Niterói</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-date">Data *</Label>
                        <Input
                          id="edit-date"
                          type="date"
                          value={newActivity.date}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-time">Horário *</Label>
                        <Select 
                          value={newActivity.time} 
                          onValueChange={(value) => setNewActivity(prev => ({ ...prev, time: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manhã">Manhã (6h-12h)</SelectItem>
                            <SelectItem value="tarde">Tarde (12h-18h)</SelectItem>
                            <SelectItem value="noite">Noite (18h-22h)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-capacity">Capacidade Máxima *</Label>
                        <Input
                          id="edit-capacity"
                          type="number"
                          value={newActivity.capacity}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, capacity: e.target.value }))}
                          placeholder="Ex: 10"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-price">Preço (R$) *</Label>
                        <Input
                          id="edit-price"
                          type="number"
                          step="0.01"
                          value={newActivity.price}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="Ex: 25.00"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Descrição</Label>
                      <Textarea
                        id="edit-description"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Descreva a atividade..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditActivityOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" variant="cta">
                        Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.length === 0 ? (
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
                activities.map((activity) => (
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
                        <h3 className="text-xl font-semibold">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.beach}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="capitalize">{activity.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{activity.enrollments}/{activity.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-primary">R$ {activity.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
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
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;