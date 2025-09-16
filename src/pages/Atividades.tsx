import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
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

  // Mock data for MVP
  const activities = [
    {
      title: "Beach Volley",
      location: "Icaraí, Niterói",
      instructor: "Lucas Silva",
      time: "09:00 às 10:00",
      capacity: "8/12",
      price: "R$ 25,00",
      image: beachvolleyImage,
      category: "sand" as const,
    },
    {
      title: "Beach Tennis",
      location: "Copacabana, Niterói",
      instructor: "Ana Costa",
      time: "16:00 às 17:00",
      capacity: "6/8",
      price: "R$ 35,00",
      image: beachtennisImage,
      category: "sand" as const,
    },
    {
      title: "Futebol",
      location: "Piratininga, Niterói",
      instructor: "Carlos Santos",
      time: "18:00 às 19:00",
      capacity: "16/20",
      price: "R$ 15,00",
      image: futebolImage,
      category: "sand" as const,
    },
    {
      title: "Canoa Havaiana",
      location: "Camboinhas, Niterói",
      instructor: "Marina Waves",
      time: "07:00 às 08:30",
      capacity: "4/6",
      price: "R$ 60,00",
      image: canoaImage,
      category: "sea" as const,
    },
    {
      title: "Beach Volley",
      location: "Itaipu, Niterói",
      instructor: "Pedro Lima",
      time: "19:00 às 20:00",
      capacity: "10/12",
      price: "R$ 20,00",
      image: beachvolleyImage,
      category: "sand" as const,
    },
    {
      title: "Beach Tennis",
      location: "São Francisco, Niterói",
      instructor: "Julia Fernandes",
      time: "08:00 às 09:00",
      capacity: "4/8",
      price: "R$ 40,00",
      image: beachtennisImage,
      category: "sand" as const,
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

  const instructors = [
    "Lucas Silva",
    "Ana Costa", 
    "Carlos Santos",
    "Marina Waves",
    "Pedro Lima",
    "Julia Fernandes",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra Atividades nas Praias
          </h1>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Busque por atividades, praias ou instrutores..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10 bg-white/90 backdrop-blur-sm border-0 text-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* City Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Cidade</label>
              <Select value={filters.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Niterói" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="niteroi">Niterói</SelectItem>
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
                  <SelectItem value="">Todas</SelectItem>
                  {beaches.map(beach => (
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
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="beachvolley">Beach Volley</SelectItem>
                  <SelectItem value="beachtennis">Beach Tennis</SelectItem>
                  <SelectItem value="futebol">Futebol</SelectItem>
                  <SelectItem value="canoa-havaiana">Canoa Havaiana</SelectItem>
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
                  <SelectItem value="">Todos</SelectItem>
                  {instructors.map(instructor => (
                    <SelectItem key={instructor} value={instructor.toLowerCase()}>{instructor}</SelectItem>
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
                  <SelectItem value="">Todos</SelectItem>
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
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activities.length} atividades encontradas
            </h2>
            <Button variant="outline">
              Ordenar por preço
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais atividades
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Atividades;