import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { useEffect } from "react";

const Eventos = () => {
  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventos = [
    {
      id: 1,
      title: "4ª ETAPA DO CIRCUITO NITEROIENSE DE BEACH TENNIS",
      date: "11 e 12 de Outubro",
      time: "7:00 às 16:00 (sáb) / 7:00 às 15:00 (dom)",
      location: "Praia de Icaraí - Avenida Jornalista Alberto Francisco Torres",
      category: "Esporte",
      description: "Participe da 4ª etapa do Circuito Niteroiense de Beach Tennis. Competição aberta para todas as categorias.",
      image: "🎾",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      title: "3ª ETAPA DO SUPER PADDLE (CANOA HAVAIANA)",
      date: "18 de Outubro",
      time: "6:00 às 17:00",
      location: "Praia de Itaipu",
      category: "Esporte",
      description: "Terceira etapa do Super Paddle de Canoa Havaiana. Venha competir nas águas de Itaipu.",
      image: "🚣",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "BRASIL TOUR DE SURF",
      date: "18 de Outubro",
      time: "8:00 às 17:00",
      location: "Praia de Itacoatiara",
      category: "Esporte",
      description: "Campeonato nacional de surf com atletas de todo o Brasil competindo nas ondas de Itacoatiara.",
      image: "🏄",
      color: "from-cyan-400 to-blue-600"
    },
    {
      id: 4,
      title: "FESTIVAL DE PRAIA NITERÓI",
      date: "25 de Outubro",
      time: "9:00 às 18:00",
      location: "Praia de Icaraí",
      category: "Lazer",
      description: "Festival com diversas atividades de praia, música ao vivo e gastronomia local.",
      image: "🏖️",
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 5,
      title: "CORRIDA DA PRAIA",
      date: "1 de Novembro",
      time: "7:00 às 10:00",
      location: "Calçadão de Icaraí",
      category: "Esporte",
      description: "Corrida de 5km e 10km no calçadão de Icaraí. Inscrições abertas para todas as idades.",
      image: "🏃",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 6,
      title: "CAMPEONATO DE VOLEI DE PRAIA",
      date: "8 de Novembro",
      time: "8:00 às 16:00",
      location: "Praia de Camboinhas",
      category: "Esporte",
      description: "Campeonato de vôlei de praia com categorias masculina, feminina e mista.",
      image: "🏐",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Eventos</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Confira todos os eventos que acontecem nas praias de Niterói
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventos.map((evento) => (
                <Card key={evento.id} className="overflow-hidden card-hover">
                  <div className="relative h-48">
                    <div className={`w-full h-full bg-gradient-to-br ${evento.color} flex items-center justify-center`}>
                      <div className="text-center text-white">
                        <div className="text-4xl font-bold mb-2">{evento.image}</div>
                        <div className="text-sm font-semibold">{evento.category.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                        {evento.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2">
                      {evento.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{evento.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{evento.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{evento.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {evento.description}
                    </p>
                    
                    <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                      Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Não encontrou o que procura?
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore todas as atividades disponíveis nas praias de Niterói
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/atividades">
                <Button variant="cta" size="lg">
                  Ver todas as atividades
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="outline" size="lg">
                  Cadastre-se
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Eventos;
