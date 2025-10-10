import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Users, Calendar, Waves, Trophy, Zap, Dumbbell, Target, ChevronLeft, ChevronRight } from "lucide-react";
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

  const cities = ["Niterói", "Rio de Janeiro"];
  const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
  const beachesByCity = {
    "Niterói": ["Icaraí", "Charitas", "São Francisco", "Camboinhas", "Gragoatá"],
    "Rio de Janeiro": [],
  };

  const getAvailableBeaches = () => {
    if (!newActivity.city) return ["Outra"];
    const cityBeaches = beachesByCity[newActivity.city as keyof typeof beachesByCity] || [];
    return [...cityBeaches, "Outra"];
  };

  const activityTypes = ["Beach Tennis", "Canoa Havaiana", "Circuito Funcional", "Futevôlei", "Vela", "Vôlei de Praia"];

  const getActivityIcon = (title: string) => {
    switch (title) {
      case "Beach Tennis": return <Target className="h-4 w-4 text-primary" />;
      case "Vôlei de Praia": return <Trophy className="h-4 w-4 text-primary" />;
      case "Futevôlei": return <Zap className="h-4 w-4 text-primary" />;
      case "Canoa Havaiana": return <Waves className="h-4 w-4 text-primary" />;
      case "Vela": return <Waves className="h-4 w-4 text-primary" />;
      case "Circuito Funcional": return <Dumbbell className="h-4 w-4 text-primary" />;
      default: return <Target className="h-4 w-4 text-primary" />;
    }
  };

  const getActivityImage = (title: string) => {
    switch (title) {
      case "Beach Tennis": return beachtennisImage;
      case "Vôlei de Praia": return beachvolleyImage;
      case "Futevôlei": return futebolImage;
      case "Canoa Havaiana": return canoaImage;
      case "Vela": return velaImage;
      case "Circuito Funcional": return circuitoFuncionalImage;
      default: return beachvolleyImage;
    }
  };

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
    if (!user || !newActivity.locationName || !newActivity.title || !newActivity.city || !newActivity.state || !newActivity.beach) {
      toast({ title: "Erro", description: "Por favor, preencha os campos obrigatórios.", variant: "destructive" });
      return;
    }
    try {
      const result = await createActivity({ ...newActivity, status: "active", is_featured: false });
      if (result) {
        toast({ title: "Sucesso", description: "Atividade criada com sucesso!" });
        setIsNewActivityOpen(false);
        setNewActivity({ locationName: "", title: "", city: "", state: "RJ", beach: "", address: "", neighborhood: "", contact: "", socials: "", day: "", daysOfWeek: [], time: "", capacity: "", price: "", description: "" });
      } else {
        toast({ title: "Erro", description: "Erro ao criar atividade.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      toast({ title: "Erro", description: "Erro inesperado ao criar atividade.", variant: "destructive" });
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
    if (!editingActivity) return;
    try {
      const result = await updateActivity(editingActivity.id, newActivity);
      if (result) {
        toast({ title: "Sucesso", description: "Atividade atualizada com sucesso!" });
        setIsEditActivityOpen(false);
        setEditingActivity(null);
      } else {
        toast({ title: "Erro", description: "Erro ao atualizar atividade.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      toast({ title: "Erro", description: "Erro inesperado ao atualizar atividade.", variant: "destructive" });
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta atividade?")) {
      try {
        const success = await deleteActivity(activityId);
        if (success) {
          toast({ title: "Sucesso", description: "Atividade excluída com sucesso!" });
        } else {
          toast({ title: "Erro", description: "Erro ao excluir atividade.", variant: "destructive" });
        }
      } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        toast({ title: "Erro", description: "Erro inesperado ao excluir atividade.", variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-cta rounded-full flex items-center justify-center">
              <span className="font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{user?.role === 'instrutor' ? 'Painel do Instrutor' : 'Meu Painel'}</h1>
              <p className="text-sm opacity-90">{user?.name || 'Usuário'} - {user?.role === 'instrutor' ? 'Instrutor' : user?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
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

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 md:mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary">Minhas Atividades</h1>
                <p className="text-muted-foreground">{user?.role === 'instrutor' ? 'Gerencie suas aulas e atividades' : 'Atividades em que você se inscreveu'}</p>
              </div>
              
              {user?.role === 'instrutor' && (
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
                      {/* Form fields */}
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>

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
                        {activities.reduce((total, activity) => total + (activity.enrollments || 0), 0)}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {isLoading ? (
                <div className="col-span-2">
                  <Card className="text-center p-12"><CardContent><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div><p className="text-muted-foreground">Carregando atividades...</p></CardContent></Card>
                </div>
              ) : activities.length === 0 ? (
                <div className="col-span-2">
                  <Card className="text-center p-12">
                    <CardContent>
                      <div className="text-6xl mb-4">🏖️</div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {user?.role === 'instrutor' ? 'Nenhuma atividade cadastrada' : 'Você ainda não participa de nenhuma atividade'}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {user?.role === 'instrutor' ? 'Comece criando sua primeira atividade para gerenciar suas aulas na praia.' : 'Explore as atividades disponíveis no site e inscreva-se!'}
                      </p>
                      {user?.role === 'instrutor' && (
                        <Button variant="cta" onClick={() => setIsNewActivityOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Criar Primeira Atividade
                        </Button>
                      )}
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
                        <img src={getActivityImage(activity.title)} alt={activity.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Badge className="absolute top-2 left-2 bg-primary">{activity.status === 'active' ? 'Ativa' : 'Inativa'}</Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">{activity.location_name}</h3>
                            <p className="text-sm text-muted-foreground">{activity.beach}</p>
                          </div>
                          <div className="grid grid-cols-1 gap-4 text-sm">
                            <div className="flex items-center space-x-2">{getActivityIcon(activity.title)}<span>{activity.title}</span></div>
                            <div className="flex items-center space-x-2"><Calendar className="h-4 w-4 text-primary" /><span>{activity.date}</span></div>
                          </div>
                          <div className="space-y-2">
                            {user?.role === 'instrutor' && (
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditActivity(activity)}><Edit className="mr-2 h-4 w-4" />Editar</Button>
                                <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteActivity(activity.id)}><Trash2 className="mr-2 h-4 w-4" />Excluir</Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ));
                })()
              )}
            </div>

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