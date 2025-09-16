import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";

const Blog = () => {
  // Mock blog posts
  const posts = [
    {
      id: 1,
      title: "Candidatura de Rio-Niterói para Pan-Americanos 2031 é oficializada",
      excerpt: "A candidatura conjunta do Rio de Janeiro e Niterói para sediar os Jogos Pan-Americanos de 2031 foi oficialmente aceita pela Panam Sports. A sede será escolhida em agosto.",
      category: "Esporte",
      date: "01 de Maio de 2025",
      author: "Redação PraiAtiva",
      image: "/api/placeholder/600/300",
      featured: true,
    },
    {
      id: 2,
      title: "VAARIO 2025 - Campeonato Mundial de Canoa Havaiana",
      excerpt: "Pela primeira vez no Brasil, Niterói sedia o campeonato mundial de canoa havaiana (Va'a) reunindo atletas de diversos países.",
      category: "Esporte",
      date: "13 a 21 de Agosto, 2025",
      author: "Marina Torres",
      image: "/api/placeholder/600/300",
      featured: true,
    },
    {
      id: 3,
      title: "5 Benefícios do Beach Tennis para sua Saúde",
      excerpt: "Descubra como o beach tennis pode transformar sua rotina de exercícios e melhorar sua qualidade de vida.",
      category: "Saúde",
      date: "15 de Janeiro de 2025",
      author: "Dr. Carlos Silva",
      image: "/api/placeholder/600/300",
      featured: false,
    },
    {
      id: 4,
      title: "Guia Completo: Como Começar no Surf",
      excerpt: "Tudo o que você precisa saber para dar suas primeiras remadas no mundo do surf.",
      category: "Tutorial",
      date: "10 de Janeiro de 2025",
      author: "Pedro Lima",
      image: "/api/placeholder/600/300",
      featured: false,
    },
    {
      id: 5,
      title: "As Melhores Praias de Niterói para Praticar Esportes",
      excerpt: "Conheça as praias de Niterói que oferecem as melhores condições para diferentes modalidades esportivas.",
      category: "Turismo",
      date: "05 de Janeiro de 2025",
      author: "Ana Costa",
      image: "/api/placeholder/600/300",
      featured: false,
    },
    {
      id: 6,
      title: "Nutrição Esportiva na Praia: O que Comer Antes e Depois",
      excerpt: "Dicas de alimentação para maximizar seu desempenho nas atividades de praia.",
      category: "Saúde",
      date: "28 de Dezembro de 2024",
      author: "Dra. Julia Santos",
      image: "/api/placeholder/600/300",
      featured: false,
    },
  ];

  const categories = ["Todos", "Esporte", "Saúde", "Tutorial", "Turismo"];
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog PraiAtiva</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Qual é a boa?
          </p>
          <p className="mt-4 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades do mundo dos esportes na praia, 
            dicas de saúde, eventos e muito mais!
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">Destaques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="card-hover overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-cta">
                    {post.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Todos os Posts</h2>
            
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
            {regularPosts.map((post) => (
              <Card key={post.id} className="card-hover overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary">
                    {post.category}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Ler mais
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver todos os eventos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Não perca nenhuma novidade
            </h2>
            <p className="text-lg text-muted-foreground">
              Assine nossa newsletter e receba em primeira mão as últimas notícias do mundo da praia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 border border-input rounded-md"
              />
              <Button variant="cta">
                Assinar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;