import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { ArrowRight, Star, Users, Activity, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";

const Home = () => {
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
      location: "Copacabana, Rio de Janeiro",
      instructor: "Ana Costa", 
      time: "16:00 às 17:00",
      capacity: "6/8",
      price: "R$ 35,00", 
      image: beachtennisImage,
      category: "sand" as const,
    },
    {
      title: "Surf",
      location: "Barra da Tijuca, Rio de Janeiro",
      instructor: "Pedro Waves",
      time: "07:00 às 09:00", 
      capacity: "4/6",
      price: "R$ 80,00",
      image: canoaImage,
      category: "sea" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean min-h-[600px] flex items-center justify-center text-center text-white relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-sm opacity-90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
              Em breve - Seja um dos primeiros
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Chegou a hora dessa{" "}
              <span className="text-cta">gente<br />bronzeada</span>{" "}
              mostrar seu{" "}
              <span className="text-accent">valor!</span>
            </h1>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl">
                Vem aí a <span className="text-cta font-semibold">1ª plataforma</span> do país que conecta você ao melhor do{" "}
                <span className="text-accent font-semibold">esporte</span>,{" "}
                <span className="text-cta font-semibold">turismo</span> e{" "}
                <span className="text-accent font-semibold">lazer</span> exclusivamente nas praias!
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/blog">
                <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Blog
                </Button>
              </Link>
              <Link to="/tv-praiativa">
                <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  TV PraiAtiva
                </Button>
              </Link>
              <Link to="/sobre">
                <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Sobre nós
                </Button>
              </Link>
              <Link to="/contato">
                <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Contato
                </Button>
              </Link>
            </div>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/cadastro">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Cadastre-se gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/atividades">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary">
                  Explorar atividades
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-4xl">☀️</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Se essa é sua praia, se joga!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crie uma rotina de vida mais ativa, saudável e integrada à natureza!
            </p>
            <div className="space-y-4 text-muted-foreground">
              <p>
                PRAIATIVA conecta quem busca a quem oferece todas as atividades de esporte, lazer e
                turismo exclusivamente nas praias. No seu tempo, do seu jeito, na palma de sua mão!
              </p>
              <p>
                Autoestima, força mental e física e uma vida mais saudável, tudo isso é também uma
                questão de treino: precisam ser praticadas sempre.
              </p>
              <p className="font-medium text-primary">
                Vamos nessa? Descubra a sua praia e se joga!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sea Activities */}
            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <img src={canoaImage} alt="Atividades no mar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">No mar</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-accent px-3 py-1 rounded-full text-sm">Surf</span>
                    <span className="bg-accent px-3 py-1 rounded-full text-sm">Stand Up Paddle</span>
                    <span className="bg-accent px-3 py-1 rounded-full text-sm">Natação</span>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Surf, Stand Up Paddle, Natação e mais
                  </p>
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary">
                    Ver atividades <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Sand Activities */}
            <Card className="card-hover overflow-hidden">
              <div className="relative h-64">
                <img src={beachvolleyImage} alt="Atividades na areia" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Na areia e calçadão</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-cta px-3 py-1 rounded-full text-sm">Vôlei</span>
                    <span className="bg-cta px-3 py-1 rounded-full text-sm">Futevôlei</span>
                    <span className="bg-cta px-3 py-1 rounded-full text-sm">Corrida</span>
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    Vôlei, Futevôlei, Corrida e mais
                  </p>
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary">
                    Ver atividades <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/atividades">
              <Button variant="cta" size="lg">
                CONHEÇA TODAS AS ATIVIDADES
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Atividades em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/atividades">
              <Button variant="outline">
                Ver todas as atividades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Por que escolher o PRAIATIVA?
            </h2>
            <p className="text-xl text-muted-foreground">
              Transpire. Inspire. Praiative-se!
            </p>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Desbloqueie o melhor da sua praia com segurança, liberdade e muito movimento. Deixe a
              rotina de lado e viva experiências ao ar livre — do seu jeito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <div className="text-3xl font-bold text-primary mb-2">200%</div>
              <div className="text-sm font-semibold text-muted-foreground mb-2">ECONOMIA EM SAÚDE</div>
              <p className="text-xs text-muted-foreground">
                Investir em atividade física pode gerar até 200% de economia em gastos com saúde a longo prazo.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🏃</div>
              <div className="text-3xl font-bold text-primary mb-2">97%</div>
              <div className="text-sm font-semibold text-muted-foreground mb-2">SAÚDE E BOA FORMA</div>
              <p className="text-xs text-muted-foreground">
                Dos brasileiros relacionam esportes diretamente à saúde física e mental, com benefícios comprovados.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="text-4xl mb-4">⚠️</div>
              <div className="text-3xl font-bold text-primary mb-2">60%</div>
              <div className="text-sm font-semibold text-muted-foreground mb-2">SEDENTARISMO</div>
              <p className="text-xs text-muted-foreground">
                Dos brasileiros não praticam atividade física regularmente, aumentando em 30% o risco de desenvolver doenças.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🏖️</div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm font-semibold text-muted-foreground mb-2">OPÇÕES EM 1KM</div>
              <p className="text-xs text-muted-foreground">
                Mais de 500 opções de atividades esportivas em apenas 1km de praia. São 7,3 mil km de litoral para explorar!
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/cadastro">
              <Button variant="cta" size="lg">
                CADASTRE-SE AGORA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;