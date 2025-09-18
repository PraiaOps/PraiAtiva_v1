import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { useEffect } from "react";

// Import das imagens
import beachTennisImg from "@/assets/beachtennis.jpg";
import canoaHavaianaImg from "@/assets/canoa-havaiana.jpg";
import surfImg from "@/assets/hero-beach.jpg"; // Usando hero-beach como placeholder para surf
import festivalPraiaImg from "@/assets/beachvolley.jpg"; // Usando beachvolley como placeholder para festival

const Eventos = () => {
  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventos = [
    {
      id: 1,
      title: "4ª ETAPA DO CIRCUITO NITEROIENSE DE BEACH TENNIS",
      date: "11 outubro @ 7:00 am - 4:00 pm",
      time: "7:00 às 16:00",
      location: "PRAIA DE ICARAÍ Avenida Jornalista Alberto Francisco Torres - Icaraí, Niterói, Rio de Janeiro, Brazil",
      category: "Beach Tennis",
      description: "Participe da 4ª etapa do Circuito Niteroiense de Beach Tennis na Praia de Icaraí.",
      image: beachTennisImg,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      title: "4ª ETAPA DO CIRCUITO NITEROIENSE DE BEACH TENNIS",
      date: "12 outubro @ 7:00 am - 3:00 pm",
      time: "7:00 às 15:00",
      location: "PRAIA DE ICARAÍ Avenida Jornalista Alberto Francisco Torres - Icaraí, Niterói, Rio de Janeiro, Brazil",
      category: "Beach Tennis",
      description: "Continuação da 4ª etapa do Circuito Niteroiense de Beach Tennis na Praia de Icaraí.",
      image: beachTennisImg,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      title: "3ª ETAPA DO SUPER PADDLE (CANOA HAVAIANA)",
      date: "18 outubro @ 6:00 am - 5:00 pm",
      time: "6:00 às 17:00",
      location: "PRAIA DE ITAIPU Praia de Itaipu, Itaipu, Niterói, Rio de Janeiro, Brazil",
      category: "Canoa Havaiana",
      description: "Terceira etapa do Super Paddle de Canoa Havaiana na Praia de Itaipu.",
      image: canoaHavaianaImg,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      title: "BRASIL TOUR DE SURF",
      date: "18 outubro @ 8:00 am - 5:00 pm",
      time: "8:00 às 17:00",
      location: "PRAIA DE ITACOATIARA Itacoatiara, Niterói - RJ, Niterói, Rio de Janeiro, Brazil",
      category: "Surf",
      description: "Brasil Tour de Surf acontece na icônica Praia de Itacoatiara, Niterói.",
      image: surfImg,
      color: "from-cyan-400 to-blue-600"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventos.map((evento) => (
                <Card key={evento.id} className="overflow-hidden card-hover">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={evento.image} 
                      alt={evento.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-sm font-semibold text-white bg-black/50 px-2 py-1 rounded">
                        {evento.category.toUpperCase()}
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
