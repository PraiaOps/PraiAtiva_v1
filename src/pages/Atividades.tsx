import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase, Activity } from "@/lib/supabase";
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";

const Atividades = () => {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    beach: "",
    activity: "",
    instructor: "",
    time: "",
    date: "",
  });
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [instructorNames, setInstructorNames] = useState<{ [key: string]: string }>({});

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

  // Determinar categoria baseada no tipo de atividade
  const getActivityCategory = (title: string) => {
    const activityTitle = title.toLowerCase();
    if (activityTitle.includes('canoa') || activityTitle.includes('havaiana') || activityTitle.includes('paddle')) {
      return 'sea' as const;
    }
    return 'sand' as const;
  };

  // Buscar atividades ativas do Supabase
  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      
      // Buscar atividades ativas
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .eq('status', 'active')
        .order('date', { ascending: true });

      if (activitiesError) {
        console.error('Erro ao buscar atividades:', activitiesError);
        return;
      }

      // Buscar nomes dos instrutores
      const instructorIds = [...new Set(activitiesData?.map(activity => activity.instructor_id))];
      
      if (instructorIds.length > 0) {
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, name')
          .in('id', instructorIds);

        if (usersError) {
          console.error('Erro ao buscar instrutores:', usersError);
        } else {
          const namesMap = usersData?.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
          }, {} as { [key: string]: string }) || {};
          setInstructorNames(namesMap);
        }
      }

      setActivities(activitiesData || []);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll para o topo quando a página carregar e buscar atividades
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchActivities();
  }, []);

  // Converter atividades do Supabase para formato do ActivityCard
  const convertedActivities = activities.map(activity => ({
    title: activity.title,
    location: activity.beach,
    instructor: instructorNames[activity.instructor_id] || 'Instrutor',
    time: `${activity.time}`,
    capacity: `${activity.enrollments}/${activity.capacity}`,
    price: `R$ ${activity.price.toFixed(2)}`,
    image: getActivityImage(activity.title),
    category: getActivityCategory(activity.title),
  }));

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encontre sua Atividade
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubra atividades incríveis nas praias de Niterói e Rio de Janeiro
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Buscar atividades, instrutores ou praias..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <Button variant="default">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>

              {/* Filter Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Cidade</label>
                  <Select value={filters.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="niteroi">Niterói</SelectItem>
                      <SelectItem value="rio">Rio de Janeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Beach Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Praia</label>
                  <Select value={filters.beach} onValueChange={(value) => setFilters(prev => ({ ...prev, beach: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {beaches.map((beach) => (
                        <SelectItem key={beach} value={beach.toLowerCase()}>{beach}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Atividade</label>
                  <Select value={filters.activity} onValueChange={(value) => setFilters(prev => ({ ...prev, activity: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {activityTypes.map((activity) => (
                        <SelectItem key={activity} value={activity.toLowerCase()}>{activity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Instructor Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Instrutor</label>
                  <Select value={filters.instructor} onValueChange={(value) => setFilters(prev => ({ ...prev, instructor: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {Object.values(instructorNames).map((name, index) => (
                        <SelectItem key={index} value={name.toLowerCase()}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Horário</label>
                  <Select value={filters.time} onValueChange={(value) => setFilters(prev => ({ ...prev, time: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="manha">Manhã</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="noite">Noite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Data</label>
                  <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {isLoading ? 'Carregando...' : `${convertedActivities.length} atividades encontradas`}
            </h2>
            <Button variant="outline">
              Ordenar por preço
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-1"></div>
                    <div className="h-3 bg-muted rounded mb-1"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : convertedActivities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Nenhuma atividade encontrada.
              </p>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou criar uma nova atividade no dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {convertedActivities.map((activity, index) => (
                <ActivityCard key={index} {...activity} />
              ))}
            </div>
          )}

          {/* Load More */}
          {!isLoading && convertedActivities.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Carregar mais atividades
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Atividades;