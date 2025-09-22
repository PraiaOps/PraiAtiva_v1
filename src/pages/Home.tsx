import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { ArrowRight, Star, Users, Activity, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase, Activity as SupabaseActivity } from "@/lib/supabase";
import heroImage from "@/assets/hero-beach.jpg";
import beachvolleyImage from "@/assets/beachvolley.jpg";
import beachtennisImage from "@/assets/beachtennis.jpg";
import futebolImage from "@/assets/futebol.jpg";
import canoaImage from "@/assets/canoa-havaiana.jpg";
import velaImage from "@/assets/vela.jpg";
import circuitoFuncionalImage from "@/assets/circuito-funcional.jpg";
// Imports para eventos
import beachTennisEventImg from "@/assets/beachtennis.jpg";
import canoaHavaianaEventImg from "@/assets/canoa-havaiana.jpg";

const Home = () => {
  const [activities, setActivities] = useState<SupabaseActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [instructorNames, setInstructorNames] = useState<{ [key: string]: string }>({});

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

  // Determinar categoria baseada no tipo de atividade
  const getActivityCategory = (title: string) => {
    const activityTitle = title.toLowerCase();
    if (activityTitle.includes('canoa') || activityTitle.includes('havaiana') || activityTitle.includes('paddle')) {
      return 'sea' as const;
    }
    return 'sand' as const;
  };

  // Buscar atividades em destaque do Supabase
  const fetchFeaturedActivities = async () => {
    try {
      setIsLoading(true);
      
      // Buscar as 6 primeiras atividades ativas
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      if (activitiesError) {
        console.error('Erro ao buscar atividades:', activitiesError);
        return;
      }

      // Buscar nomes dos instrutores com preferência de visibilidade
      const instructorIds = [...new Set(activitiesData?.map(activity => activity.instructor_id))];
      
      if (instructorIds.length > 0) {
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, name, show_name')
          .in('id', instructorIds);

        if (usersError) {
          console.error('Erro ao buscar instrutores:', usersError);
        } else {
          const namesMap = usersData?.reduce((acc, user) => {
            // Mostrar nome apenas se show_name for true, senão não mostrar nada
            acc[user.id] = user.show_name ? user.name : '';
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

  // Buscar atividades quando o componente montar
  useEffect(() => {
    fetchFeaturedActivities();
  }, []);

  // Converter atividades do Supabase para formato do ActivityCard
  const convertedActivities = activities.map(activity => ({
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean min-h-[600px] flex items-center justify-center text-center text-white relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            
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
              <Button 
                variant="ghost" 
                className="text-white border border-white/30 hover:bg-white/10"
                onClick={() => window.open('https://www.praiativa.com.br/blog', '_blank')}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Blog
              </Button>
              <Button 
                variant="ghost" 
                className="text-white border border-white/30 hover:bg-white/10"
                onClick={() => window.open('https://www.youtube.com/@praiativasuaatividadesuapr3965', '_blank')}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                TV PraiAtiva
              </Button>
              <Link to="/sobre">
                <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Sobre nós
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-white border border-white/30 hover:bg-white/10"
                onClick={() => {
                  document.getElementById('contato')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Contato
              </Button>
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
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-primary border-white hover:bg-white/90 hover:text-primary">
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
                <Link to="/sobre" className="hover:text-primary/80 hover:scale-105 transition-all duration-200 cursor-pointer inline-block">
                  Vamos nessa? Descubra mais sobre nossa história
                </Link>
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
                    {activities
                      .filter(activity => getActivityCategory(activity.title) === 'sea')
                      .slice(0, 3)
                      .map((activity, index) => (
                        <span key={index} className="bg-accent px-3 py-1 rounded-full text-sm">
                          {activity.title}
                        </span>
                      ))}
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    {activities.filter(activity => getActivityCategory(activity.title) === 'sea').length > 0 
                      ? `${activities.filter(activity => getActivityCategory(activity.title) === 'sea').length} atividade${activities.filter(activity => getActivityCategory(activity.title) === 'sea').length > 1 ? 's' : ''} disponível${activities.filter(activity => getActivityCategory(activity.title) === 'sea').length > 1 ? 'eis' : ''}`
                      : 'Nenhuma atividade disponível'}
                  </p>
                  <Link to="/atividades?category=sea">
                    <Button variant="outline" size="sm" className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary">
                      Ver atividades <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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
                    {activities
                      .filter(activity => getActivityCategory(activity.title) === 'sand')
                      .slice(0, 3)
                      .map((activity, index) => (
                        <span key={index} className="bg-cta px-3 py-1 rounded-full text-sm">
                          {activity.title}
                        </span>
                      ))}
                  </div>
                  <p className="text-sm opacity-90 mb-3">
                    {activities.filter(activity => getActivityCategory(activity.title) === 'sand').length > 0 
                      ? `${activities.filter(activity => getActivityCategory(activity.title) === 'sand').length} atividade${activities.filter(activity => getActivityCategory(activity.title) === 'sand').length > 1 ? 's' : ''} disponível${activities.filter(activity => getActivityCategory(activity.title) === 'sand').length > 1 ? 'eis' : ''}`
                      : 'Nenhuma atividade disponível'}
                  </p>
                  <Link to="/atividades?category=sand">
                    <Button variant="outline" size="sm" className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary">
                      Ver atividades <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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

      {/* Events Section - Qual é a boa? */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Qual é a boa?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Event 1 - Circuito Niteroiense de Beach Tennis */}
              <Card className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={beachTennisEventImg} 
                    alt="4ª Etapa do Circuito Niteroiense de Beach Tennis"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-sm font-semibold text-white bg-black/50 px-2 py-1 rounded">
                      BEACH TENNIS
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">Esporte</span>
                    <span className="text-sm text-muted-foreground">Sáb 11 e Dom 12 de Outubro</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    4ª ETAPA DO CIRCUITO NITEROIENSE DE BEACH TENNIS
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Horário:</strong> 7:00 às 16:00 (sáb) / 7:00 às 15:00 (dom)
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Local:</strong> Praia de Icaraí - Avenida Jornalista Alberto Francisco Torres
                  </p>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Event 2 - Super Paddle Canoa Havaiana */}
              <Card className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={canoaHavaianaEventImg} 
                    alt="3ª Etapa do Super Paddle (Canoa Havaiana)"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-sm font-semibold text-white bg-black/50 px-2 py-1 rounded">
                      CANOA HAVAIANA
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">Esporte</span>
                    <span className="text-sm text-muted-foreground">Sáb 18 de Outubro</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    3ª ETAPA DO SUPER PADDLE (CANOA HAVAIANA)
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Horário:</strong> 6:00 às 17:00
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Local:</strong> Praia de Itaipu
                  </p>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                    Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to="/eventos">
                <Button variant="outline" size="lg" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                  Ver todos os eventos <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Atividades em Destaque
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted-foreground/10 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted-foreground/10 rounded mb-2"></div>
                    <div className="h-3 bg-muted-foreground/10 rounded mb-1"></div>
                    <div className="h-3 bg-muted-foreground/10 rounded mb-1"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : convertedActivities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Nenhuma atividade cadastrada ainda.
              </p>
              <p className="text-muted-foreground mb-6">
                Seja o primeiro a criar uma atividade!
              </p>
              <Link to="/login">
                <Button variant="default">
                  Criar Atividade
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {convertedActivities.map((activity, index) => (
                <ActivityCard key={index} {...activity} />
              ))}
            </div>
          )}

          {!isLoading && convertedActivities.length > 0 && (
            <div className="text-center mt-8">
              <Link to="/atividades">
                <Button variant="outline">
                  Ver todas as atividades
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
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