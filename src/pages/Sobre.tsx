import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const Sobre = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-ocean py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre nós</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Informar, superar e inspirar
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">A história</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Como praticante de vôlei de praia desde 2015, quando a ideia surgiu, já vivia as "dores" que
                  o PRAIATIVA veio resolver: encontrar e se conectar facilmente a todas as atividades de
                  esporte, lazer e turismo exclusivamente nas praias. O que não se consegue pela internet,
                  nem no local, onde dependemos dos banners ao longo do calçadão, ou, com sorte, de uma
                  indicação que dê o "match". Cansei de passar por isso.
                </p>
                
                <p>
                  Mas foi em maio de 2018 que vi que a minha história estava para sempre conectada a do
                  PRAIATIVA.
                </p>
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => toggleSection('history')}
                    className="flex items-center space-x-2"
                  >
                    <span>{expandedSection === 'history' ? 'Leia menos' : 'Leia mais'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'history' ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {expandedSection === 'history' && (
                    <div className="mt-6 space-y-4 text-muted-foreground">
                      <p>
                        Em 2018, percebi que havia uma lacuna significativa no mercado de atividades nas praias.
                        As pessoas queriam se exercitar, se divertir e aproveitar o litoral brasileiro, mas não
                        tinham uma plataforma centralizada para encontrar essas oportunidades.
                      </p>
                      <p>
                        Foi então que nasceu a visão do PRAIATIVA: criar uma ponte entre quem busca atividades
                        e quem as oferece, sempre focando na experiência única que apenas as praias podem proporcionar.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">A missão</h2>
              <p className="text-lg text-muted-foreground">
                Ser uma ferramenta essencial na rotina daqueles que querem conquistar uma qualidade de
                vida mais ativa, preventiva e integrada à Natureza, inspirando todos na busca da saúde
                física, mental e social através das atividades na praia.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Nossos valores</h2>
            <p className="text-muted-foreground">
              Os princípios que guiam nossa jornada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Conexão com a Natureza</h3>
              <p className="text-muted-foreground">
                Acreditamos que as praias são o ambiente perfeito para reconectar corpo, mente e natureza.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Comunidade</h3>
              <p className="text-muted-foreground">
                Criamos laços entre pessoas que compartilham a paixão por atividades ao ar livre.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Bem-estar</h3>
              <p className="text-muted-foreground">
                Promovemos saúde física e mental através de atividades prazerosas na praia.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">Nossa equipe</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-primary-foreground font-bold">PS</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Paulo Santos</h3>
                <p className="text-muted-foreground mb-4">Fundador & CEO</p>
                <p className="text-sm text-muted-foreground">
                  Praticante de vôlei de praia desde 2015, apaixonado por conectar pessoas através do esporte.
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-primary-foreground font-bold">MT</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Marina Torres</h3>
                <p className="text-muted-foreground mb-4">Head de Operações</p>
                <p className="text-sm text-muted-foreground">
                  Especialista em turismo e lazer, com foco em experiências memoráveis na praia.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Faça parte da nossa história
            </h2>
            <p className="text-lg text-muted-foreground">
              Junte-se a nós nessa jornada de transformar a forma como as pessoas vivenciam as praias brasileiras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cadastro">
                <Button variant="cta" size="lg">
                  Cadastre-se como Instrutor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/atividades">
                <Button variant="outline" size="lg">
                  Explorar Atividades
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

export default Sobre;