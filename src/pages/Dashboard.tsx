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
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";

const Dashboard = () => {
  const [isNewActivityOpen, setIsNewActivityOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    beach: "",
    date: "",
    time: "",
    capacity: "",
    price: "",
    description: "",
  });

  // Mock data for instructor's activities
  const myActivities = [
    {
      id: 1,
      title: "Beach Tennis",
      beach: "Icaraí, Niterói",
      date: "2025-01-20",
      time: "manhã",
      capacity: "6/8",
      price: "R$ 35,00",
      status: "active",
      enrollments: 6,
      image: beachtennisImage,
    },
    {
      id: 2,
      title: "Beach Volley",
      beach: "Copacabana, Niterói",
      date: "2025-01-22",
      time: "tarde",
      capacity: "8/12",
      price: "R$ 25,00",
      status: "active",
      enrollments: 8,
      image: beachvolleyImage,
    },
  ];

  const beaches = [
    "Icaraí",
    "Copacabana",
    "Piratininga", 
    "Camboinhas",
    "Itaipu",
    "São Francisco",
  ];

  const activities = [
    "Beach Volley",
    "Beach Tennis", 
    "Futebol",
    "Canoa Havaiana",
  ];

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar criação de atividade
    console.log("Nova atividade:", newActivity);
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
              <p className="text-sm opacity-90">Paulo Santos - Instrutor</p>
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
            <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover">
              <Calendar className="mr-3 h-4 w-4" />
              Explorar
            </Button>
            <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover bg-cta-hover">
              <Users className="mr-3 h-4 w-4" />
              Minhas Atividades
            </Button>
            <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover">
              <Edit className="mr-3 h-4 w-4" />
              Inscrições
            </Button>
            <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover">
              <Users className="mr-3 h-4 w-4" />
              Perfil
            </Button>
            <div className="pt-4 border-t border-cta-hover">
              <Button variant="ghost" className="w-full justify-start text-cta-foreground hover:bg-cta-hover">
                ← Voltar ao site
              </Button>
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
                            {activities.map(activity => (
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
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Atividades Ativas</p>
                      <p className="text-2xl font-bold text-primary">2</p>
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
                      <p className="text-2xl font-bold text-primary">14</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Faturamento</p>
                      <p className="text-2xl font-bold text-primary">R$ 450</p>
                    </div>
                    <span className="text-2xl">💰</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avaliação</p>
                      <p className="text-2xl font-bold text-primary">4.9</p>
                    </div>
                    <span className="text-2xl">⭐</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myActivities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
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
                          <span>{activity.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-primary">{activity.price}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;