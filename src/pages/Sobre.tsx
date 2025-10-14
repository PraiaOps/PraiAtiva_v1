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
              <div className="space-y-6 text-foreground">
                <p>
                  Como praticante de vôlei de praia desde 2015, quando a ideia surgiu, já vivia as "dores" que o PRAIATIVA veio resolver: encontrar e se conectar facilmente a todas as atividades de esporte, lazer e turismo exclusivamente nas praias. O que não se consegue pela internet, nem no local, onde dependemos dos banners ao longo do calçadão, ou, com sorte, de uma indicação que dê o "match". Cansei de passar por isso.
                </p>
                
                <p>
                  Mas foi em maio de 2018 que vi que a minha história estaria para sempre conectada a do PRAIATIVA. Quando resolvi não parar com meu vôlei de praia mesmo nos períodos de quimioterapia na luta contra 3 dos 4 cânceres que tive daí até 2023. Fui me fortalecendo, física e mentalmente, embora tenha sido desenganado pelos médicos em novembro de 2021! Com a ajuda de Deus e da ciência (um tratamento revolucionário), estou em remissão total desde abril de 2023. Nunca desisti.
                </p>
                
                <p>
                  PRAIATIVA acabou se tornando parte dessa minha "missão" de tentar inspirar outros a agirem assim, na vida ou em seus projetos.
                </p>
                
                <p>
                  Por trás de cada atividade, de cada praticante, há uma história de superação. Dos que precisam vencer o sedentarismo, que tantas doenças graves, mortes e prejuízo financeiro traz a pessoas, empresas e governos. Daqueles que precisam de informação e motivação para escolher uma opção 100% no seu perfil. Dos instrutores que precisam de apoio na gestão de seu negócio na praia, o sustento da sua vida.
                </p>
                
                <p>
                  PRAIATIVA surgiu nesse ambiente, de falta de informação, necessidade de integração e superação.
                </p>

                <p>
                  Fomos selecionados em abril/25 com uma das 22 startups inovadoras e com potencial de crescimento no Programa Acelera Niterói, da Prefeitura de Niterói e Universidade Federal Fluminense/UFF. Em outubro, estamos testando nosso protótipo para lançamento da primeira versão, em Niterói/RJ. No verão de 2026, planejamos lançar no Rio (capital) e até 2028 em todas as regiões do país. Com o apoio de vocês, certamente vamos chegar lá! Obrigado!
                </p>
                
                <p className="font-semibold text-primary">
                  Paulo Peregrino - idealizador, CEO e Marketing do PRAIATIVA
                </p>
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
              <p className="text-lg text-foreground">
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
                  Busque Atividades na Praia
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