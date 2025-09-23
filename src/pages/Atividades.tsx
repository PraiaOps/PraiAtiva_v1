import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { Search, Filter } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePublicActivities } from "@/hooks/usePublicActivities";
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";
import velaImage from "@/assets/vela.jpg";
import circuitoFuncionalImage from "@/assets/circuito-funcional.jpg";

const Atividades = () => {
  const location = useLocation();
  
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    beach: "",
    activity: "",
    time: "",
    dayOfWeek: "", // Novo: filtro por dia da semana
    priceRange: "", // Filtro por faixa de preço dinâmica
    category: "", // Filtro por categoria (sea/sand)
  });
  
  const { activities, isLoading, instructorNames } = usePublicActivities();

  // Determinar categoria baseada no tipo de atividade
  const getActivityCategory = (title: string) => {
    const activityTitle = title.toLowerCase();
    if (activityTitle.includes('surf') || activityTitle.includes('paddle') || activityTitle.includes('natação') || 
        activityTitle.includes('canoa') || activityTitle.includes('havaiana') || activityTitle.includes('vela')) {
      return 'sea';
    }
    return 'sand';
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


  // Scroll para o topo quando a página carregar e buscar atividades
  // Gerar faixas de preço dinâmicas baseadas nas atividades
  const priceRanges = useMemo(() => {
    if (activities.length === 0) {
      return [
        { value: "free", label: "Gratuito (R$ 0)", min: 0, max: 0 }
      ];
    }
    
    const prices = activities.map(activity => activity.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    const ranges = [];
    
    // Sempre incluir "Todos"
    ranges.push({ value: "all", label: "Todos os preços" });
    
    // Se há atividades gratuitas
    if (minPrice === 0) {
      ranges.push({ value: "free", label: "Gratuito (R$ 0)", min: 0, max: 0 });
    }
    
    // Se há apenas atividades gratuitas
    if (maxPrice === 0) {
      return ranges;
    }
    
    // Criar faixas baseadas no range real de preços
    if (maxPrice <= 50) {
      ranges.push({ value: "low", label: `Até R$ ${maxPrice}`, min: minPrice > 0 ? minPrice : 1, max: maxPrice });
    } else if (maxPrice <= 100) {
      if (minPrice > 0 || ranges.some(r => r.value === "free")) {
        ranges.push({ value: "low", label: "R$ 1 - R$ 50", min: 1, max: 50 });
      }
      ranges.push({ value: "medium", label: `R$ 51 - R$ ${maxPrice}`, min: 51, max: maxPrice });
    } else {
      if (minPrice > 0 || ranges.some(r => r.value === "free")) {
        ranges.push({ value: "low", label: "R$ 1 - R$ 50", min: 1, max: 50 });
      }
      ranges.push({ value: "medium", label: "R$ 51 - R$ 100", min: 51, max: 100 });
      ranges.push({ value: "high", label: `Acima de R$ 100`, min: 101, max: maxPrice });
    }
    
    return ranges;
  }, [activities]);

  // Agora usamos o campo city diretamente da tabela activities
  // Não precisamos mais mapear cidades com base nas praias

  const normalizeTime = (value: string) => value.toLowerCase();
  
  // Mapear valores de tempo para exibição
  const timeDisplayMap: Record<string, string> = {
    'manhã': 'Manhã',
    'tarde': 'Tarde', 
    'noite': 'Noite'
  };

  const getRangesForData = (data: Activity[]) => {
    if (!data || data.length === 0) {
      return [
        { value: "all", label: "Todos os preços" },
      ];
    }
    const prices = data.map(a => a.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const ranges: Array<{ value: string; label: string; min?: number; max?: number }> = [];
    ranges.push({ value: "all", label: "Todos os preços" });
    if (minPrice === 0) {
      ranges.push({ value: "free", label: "Gratuito (R$ 0)", min: 0, max: 0 });
    }
    if (maxPrice === 0) return ranges;
    if (maxPrice <= 50) {
      ranges.push({ value: "low", label: `Até R$ ${maxPrice}`, min: minPrice > 0 ? minPrice : 1, max: maxPrice });
    } else if (maxPrice <= 100) {
      if (minPrice > 0 || ranges.some(r => r.value === "free")) {
        ranges.push({ value: "low", label: "R$ 1 - R$ 50", min: 1, max: 50 });
      }
      ranges.push({ value: "medium", label: `R$ 51 - R$ ${maxPrice}`, min: 51, max: maxPrice });
    } else {
      if (minPrice > 0 || ranges.some(r => r.value === "free")) {
        ranges.push({ value: "low", label: "R$ 1 - R$ 50", min: 1, max: 50 });
      }
      ranges.push({ value: "medium", label: "R$ 51 - R$ 100", min: 51, max: 100 });
      ranges.push({ value: "high", label: `Acima de R$ 100`, min: 101, max: maxPrice });
    }
    return ranges;
  };

  const getFilteredActivities = (exclude?: 'city' | 'beach' | 'activity' | 'time' | 'dayOfWeek' | 'priceRange' | 'category') => {
    return activities.filter(activity => {
      // Busca
      if ((!exclude || exclude !== 'search') && filters.search) {
        const query = filters.search.toLowerCase();
        const instructorName = (instructorNames[activity.instructor_id] || '').toLowerCase();
        const matches = [
          activity.location_name?.toLowerCase().includes(query),
          activity.title.toLowerCase().includes(query),
          instructorName.includes(query),
          activity.beach.toLowerCase().includes(query),
        ];
        if (!matches.some(Boolean)) return false;
      }

      // Cidade (usando campo city da tabela)
      if (exclude !== 'city' && filters.city && filters.city !== 'all') {
        if (activity.city !== filters.city) return false;
      }

      // Praia
      if (exclude !== 'beach' && filters.beach && filters.beach !== 'all' && activity.beach.toLowerCase() !== filters.beach.toLowerCase()) {
        return false;
      }

      // Atividade
      if (exclude !== 'activity' && filters.activity && filters.activity !== 'all' && activity.title.toLowerCase() !== filters.activity.toLowerCase()) {
        return false;
      }

      // Tempo (comparação direta com valores do banco)
      if (exclude !== 'time' && filters.time && filters.time !== 'all' && activity.time !== filters.time) {
        return false;
      }

      // Dia da semana
      if (exclude !== 'dayOfWeek' && filters.dayOfWeek && filters.dayOfWeek !== 'all' && activity.date !== filters.dayOfWeek) {
        return false;
      }

      // Categoria
      if (exclude !== 'category' && filters.category && filters.category !== 'all') {
        if (getActivityCategory(activity.title) !== filters.category) return false;
      }

      return true;
    });
  };

  // Opções dinâmicas para os selects (cascading entre si)
  const availableCities = useMemo(() => {
    const data = getFilteredActivities('city');
    const cities = Array.from(new Set(data.map(a => a.city)));
    return cities;
  }, [filters.search, filters.beach, filters.activity, filters.time, filters.dayOfWeek, filters.priceRange, filters.category, activities]);

  const availableBeaches = useMemo(() => {
    const data = getFilteredActivities('beach');
    let beaches = Array.from(new Set(data.map(a => a.beach)));
    if (filters.city && filters.city !== 'all') {
      // Filtrar praias que pertencem à cidade selecionada
      const cityData = data.filter(a => a.city === filters.city);
      beaches = Array.from(new Set(cityData.map(a => a.beach)));
    }
    return beaches;
  }, [filters.city, filters.search, filters.activity, filters.time, filters.dayOfWeek, filters.priceRange, filters.category, activities]);

  const availableActivities = useMemo(() => {
    const data = getFilteredActivities('activity');
    return Array.from(new Set(data.map(a => a.title)));
  }, [filters.city, filters.beach, filters.search, filters.time, filters.dayOfWeek, filters.priceRange, filters.category, activities]);

  const availableTimes = useMemo(() => {
    const data = getFilteredActivities('time');
    return Array.from(new Set(data.map(a => a.time)));
  }, [filters.city, filters.beach, filters.search, filters.activity, filters.dayOfWeek, filters.priceRange, filters.category, activities]);

  const availableDaysOfWeek = useMemo(() => {
    const data = getFilteredActivities('dayOfWeek');
    return Array.from(new Set(data.map(a => a.date)));
  }, [filters.city, filters.beach, filters.search, filters.activity, filters.time, filters.priceRange, filters.category, activities]);

  const availableCategories = useMemo(() => {
    const data = getFilteredActivities('category');
    return Array.from(new Set(data.map(a => getActivityCategory(a.title))));
  }, [filters.city, filters.beach, filters.search, filters.activity, filters.time, filters.dayOfWeek, filters.priceRange, activities]);

  const availablePriceRanges = useMemo(() => {
    const data = getFilteredActivities('priceRange');
    return getRangesForData(data);
  }, [filters.city, filters.beach, filters.search, filters.activity, filters.time, filters.dayOfWeek, filters.category, activities]);

  // Ler parâmetros da URL e aplicar filtros automáticos
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtrar atividades baseado nos filtros selecionados
  const filteredActivities = activities.filter(activity => {
    // Filtro por busca (nome do local, título, instrutor ou praia)
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const instructorName = (instructorNames[activity.instructor_id] || '').toLowerCase();
      const matches = [
        activity.location_name?.toLowerCase().includes(query),
        activity.title.toLowerCase().includes(query),
        instructorName.includes(query),
        activity.beach.toLowerCase().includes(query),
      ];
      if (!matches.some(Boolean)) {
        return false;
      }
    }

    // Filtro por cidade (usando campo city da tabela)
    if (filters.city && filters.city !== 'all') {
      if (activity.city !== filters.city) {
        return false;
      }
    }

    // Filtro por praia
    if (filters.beach && filters.beach !== 'all' && 
        activity.beach.toLowerCase() !== filters.beach.toLowerCase()) {
      return false;
    }

    // Filtro por tipo de atividade
    if (filters.activity && filters.activity !== 'all' && 
        activity.title.toLowerCase() !== filters.activity.toLowerCase()) {
      return false;
    }

    // Filtro por horário
    if (filters.time && filters.time !== 'all' && 
        activity.time !== filters.time) {
      return false;
    }

    // Filtro por dia da semana
    if (filters.dayOfWeek && filters.dayOfWeek !== 'all' && 
        activity.date !== filters.dayOfWeek) {
      return false;
    }

    // Filtro por faixa de preço dinâmica
    if (filters.priceRange && filters.priceRange !== 'all') {
      const selectedRange = priceRanges.find(range => range.value === filters.priceRange);
      if (selectedRange && selectedRange.min !== undefined && selectedRange.max !== undefined) {
        const price = activity.price;
        if (price < selectedRange.min || price > selectedRange.max) {
          return false;
        }
      }
    }

    // Filtro por categoria (sea/sand)
    if (filters.category && filters.category !== 'all') {
      const activityCategory = getActivityCategory(activity.title);
      if (activityCategory !== filters.category) {
        return false;
      }
    }

    return true;
  });

  // Converter atividades filtradas para formato do ActivityCard
  const convertedActivities = filteredActivities.map(activity => ({
    title: activity.title,
    locationName: activity.location_name || 'Local não especificado',
    location: activity.beach === 'Outra' ? activity.city : `${activity.beach}, ${activity.city}`,
    address: activity.address || '',
    instructor: instructorNames[activity.instructor_id] || '',
    time: `${activity.time}`,
    capacity: `${activity.enrollments}/${activity.capacity}`,
    price: `R$ ${activity.price.toFixed(2)}`,
    image: getActivityImage(activity.title),
    category: getActivityCategory(activity.title),
    dayOfWeek: activity.date,
    description: activity.description || '',
  }));
  
  

  // Remover arrays estáticos - agora são derivados dos dados reais


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
                    placeholder="Buscar atividades, locais, instrutores ou praias..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <Button variant="default">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setFilters({
                    search: "",
                    city: "",
                    beach: "",
                    activity: "",
                    time: "",
                    dayOfWeek: "",
                    priceRange: "",
                    category: "",
                  })}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>

              {/* Filter Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                {/* City Filter (opções dependem dos demais filtros) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Cidade</label>
                  <Select value={filters.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value, beach: '', activity: '', time: '', dayOfWeek: '', priceRange: '', category: '' }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value, beach: '', activity: '', time: '', dayOfWeek: '', priceRange: '' }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="sea">No mar</SelectItem>
                      <SelectItem value="sand">Na areia e calçadão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Beach Filter (cascading com cidade e demais filtros) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Praia</label>
                  <Select value={filters.beach} onValueChange={(value) => setFilters(prev => ({ ...prev, beach: value, activity: '', time: '', dayOfWeek: '', priceRange: '' }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {availableBeaches.map((beach) => (
                        <SelectItem key={beach} value={beach.toLowerCase()}>{beach}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity Filter (cascading com demais filtros) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Atividade</label>
                  <Select value={filters.activity} onValueChange={(value) => setFilters(prev => ({ ...prev, activity: value, time: '', dayOfWeek: '', priceRange: '' }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {availableActivities.map((activity) => (
                        <SelectItem key={activity} value={activity.toLowerCase()}>{activity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Instrutor removido dos filtros. Pesquisa via barra de busca. */}

                {/* Time Filter (cascading com demais filtros) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Horário</label>
                  <Select value={filters.time} onValueChange={(value) => setFilters(prev => ({ ...prev, time: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {availableTimes.map((t) => (
                        <SelectItem key={t} value={t}>{timeDisplayMap[t] || t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Day of Week Filter (cascading com demais filtros) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Dia da Semana</label>
                  <Select value={filters.dayOfWeek} onValueChange={(value) => setFilters(prev => ({ ...prev, dayOfWeek: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {availableDaysOfWeek.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dynamic Price Range Filter (cascading com demais filtros) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Preço</label>
                  <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePriceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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