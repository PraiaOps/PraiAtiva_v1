import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, Clock, Eye, ThumbsUp } from "lucide-react";

const TVPraiAtiva = () => {
  // Mock video content
  const featuredVideo = {
    id: 1,
    title: "Campeonato Mundial de Canoa Havaiana - VAARIO 2025",
    description: "Acompanhe os melhores momentos do campeonato mundial que aconteceu em Niterói, reunindo atletas de diversos países na primeira edição brasileira.",
    thumbnail: "/api/placeholder/800/450",
    duration: "25:30",
    views: "15.2K",
    likes: "1.2K",
    category: "Eventos",
    publishDate: "Há 2 dias",
  };

  const videos = [
    {
      id: 2,
      title: "Tutorial: Primeiros Passos no Beach Tennis",
      description: "Aprenda os fundamentos do beach tennis com a instrutora Ana Costa.",
      thumbnail: "/api/placeholder/400/225",
      duration: "18:45",
      views: "8.5K",
      likes: "650",
      category: "Tutorial",
      publishDate: "Há 1 semana",
    },
    {
      id: 3,
      title: "As Praias Mais Esportivas do Rio de Janeiro",
      description: "Conheça os melhores locais para praticar esportes nas praias cariocas.",
      thumbnail: "/api/placeholder/400/225",
      duration: "12:20",
      views: "12.8K",
      likes: "980",
      category: "Turismo",
      publishDate: "Há 2 semanas",
    },
    {
      id: 4,
      title: "Surf: Técnicas Avançadas com Pedro Waves",
      description: "Dicas profissionais para aprimorar sua técnica no surf.",
      thumbnail: "/api/placeholder/400/225",
      duration: "22:15",
      views: "6.7K",
      likes: "520",
      category: "Tutorial",
      publishDate: "Há 3 semanas",
    },
    {
      id: 5,
      title: "Beach Volley: Preparação Física e Mental",
      description: "Como se preparar para competições de beach volley com Lucas Silva.",
      thumbnail: "/api/placeholder/400/225",
      duration: "16:40",
      views: "9.3K",
      likes: "750",
      category: "Treinamento",
      publishDate: "Há 1 mês",
    },
    {
      id: 6,
      title: "Alimentação para Atletas de Praia",
      description: "Nutricionista explica a melhor dieta para esportes na praia.",
      thumbnail: "/api/placeholder/400/225",
      duration: "14:55",
      views: "5.4K",
      likes: "420",
      category: "Saúde",
      publishDate: "Há 1 mês",
    },
    {
      id: 7,
      title: "Stand Up Paddle: Equilibrio e Técnica",
      description: "Domine o SUP com dicas essenciais de equilíbrio.",
      thumbnail: "/api/placeholder/400/225",
      duration: "19:30",
      views: "7.1K",
      likes: "580",
      category: "Tutorial",
      publishDate: "Há 1 mês",
    },
  ];

  const categories = ["Todos", "Eventos", "Tutorial", "Turismo", "Treinamento", "Saúde"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">TV PraiAtiva</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Conteúdo exclusivo sobre esportes na praia
          </p>
          <p className="mt-4 max-w-3xl mx-auto">
            Tutoriais, eventos, entrevistas e muito mais para você ficar por dentro do melhor do mundo da praia.
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">Em Destaque</h2>
          
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src={featuredVideo.thumbnail} 
                  alt={featuredVideo.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button variant="cta" size="lg" className="rounded-full w-20 h-20">
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-cta">
                  {featuredVideo.category}
                </Badge>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-white text-sm">
                  {featuredVideo.duration}
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {featuredVideo.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>{featuredVideo.views} visualizações</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{featuredVideo.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{featuredVideo.publishDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Library */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Biblioteca de Vídeos</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Todos" ? "cta" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="card-hover overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="cta" size="sm" className="rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary text-xs">
                    {video.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-white text-xs">
                    {video.duration}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{video.likes}</span>
                        </div>
                      </div>
                      <span>{video.publishDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais vídeos
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Não perca nenhum conteúdo
            </h2>
            <p className="text-lg text-muted-foreground">
              Inscreva-se em nosso canal e receba notificações de novos vídeos sobre esportes na praia.
            </p>
            <Button variant="cta" size="lg" className="px-8">
              Inscrever-se no Canal
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TVPraiAtiva;