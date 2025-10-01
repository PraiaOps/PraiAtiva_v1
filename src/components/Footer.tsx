import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube } from "lucide-react";
import logoImage from "@/assets/logo-praiativa-new.jpeg";
import panMarcaLogo from "@/assets/pan-marca-vert-cor-vetor.png";
import smictLogo from "@/assets/smict-hor-branco.png";
import fecLogo from "@/assets/logo-fec-simplificada-fundoclaro.png";
import uffLogo from "@/assets/logo-uff-azul.png";
import odsSeal from "@/assets/ods-seal.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img 
              src={logoImage} 
              alt="PraiAtiva" 
              className="h-10 w-auto"
            />
            <p className="text-sm text-primary-foreground opacity-90">
              Conectando pessoas a uma vida mais ativa, saudável, inspiradora e integrada à natureza. Se essa é sua praia: PRAIATIVA é seu app!
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-3 hover:bg-primary-hover"
                onClick={() => window.open('https://www.instagram.com/praiativa/', '_blank')}
              >
                <Instagram className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-3 hover:bg-primary-hover"
                onClick={() => window.open('https://www.facebook.com/praiativa/?ref=pl_edit_xav_ig_profile_page_web#', '_blank')}
              >
                <Facebook className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-3 hover:bg-primary-hover"
                onClick={() => window.open('https://www.youtube.com/@praiativasuaatividadesuapr3965', '_blank')}
              >
                <Youtube className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-cta">Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-cta transition-colors">
                Home
              </Link>
              <Link to="/atividades" className="block text-sm hover:text-cta transition-colors">
                Atividades
              </Link>
              <Link to="/sobre" className="block text-sm hover:text-cta transition-colors">
                Sobre
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('contato')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="block text-sm hover:text-cta transition-colors cursor-pointer text-left"
              >
                Contato
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contato" className="space-y-4">
            <h3 className="font-semibold text-cta">Contato</h3>
            <div className="space-y-2 text-sm">
              <p>📍 Icaraí, Niterói - RJ</p>
              <p>
                📧 <a 
                  href="mailto:praiativa@praiativa.com.br" 
                  className="hover:text-cta transition-colors cursor-pointer underline"
                >
                  praiativa@praiativa.com.br
                </a>
              </p>
              <p>
                📞 <a 
                  href="tel:+5521995512227" 
                  className="hover:text-cta transition-colors cursor-pointer underline"
                >
                  (21) 99551-2227
                </a>
              </p>
            </div>
          </div>

          {/* Apoios, Parcerias e Certificações Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-cta">APOIOS, PARCERIAS E CERTIFICAÇÕES</h3>
            
            {/* Layout simplificado em duas colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Coluna da esquerda - Logos */}
              <div className="space-y-4">
                {/* Logo Programa Acelera no topo */}
                <div className="bg-white/15 p-3 rounded-lg backdrop-blur-sm">
                  <img 
                    src={panMarcaLogo} 
                    alt="Programa Acelera Niterói"
                    className="block h-auto w-auto max-h-14 filter brightness-120 contrast-115 saturate-110 drop-shadow-md"
                  />
                </div>

                {/* Apoio financeiro - Prefeitura */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary-foreground">Apoio financeiro</h4>
                  <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <img 
                      src={smictLogo} 
                      alt="Prefeitura de Niterói - SMICT"
                      className="block h-auto w-auto max-h-14 filter brightness-125 contrast-120 drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Organização e gestão - FEC e UFF MUITO próximas */}
                <div>
                  <h4 className="text-sm font-medium text-primary-foreground mb-1">Organização e gestão</h4>
                  <div className="flex items-center bg-white/15 p-3 rounded-lg backdrop-blur-sm">
                    <img 
                      src={fecLogo} 
                      alt="FEC"
                      className="block h-auto w-auto max-h-10 filter brightness-120 contrast-115 drop-shadow-md"
                    />
                    <img 
                      src={uffLogo} 
                      alt="Universidade Federal Fluminense"
                      className="block h-auto w-auto max-h-32 -ml-6 filter brightness-120 contrast-115 drop-shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Coluna da direita - Texto no topo, ODS alinhado com "Organização e gestão" */}
              <div className="space-y-4">
                <div className="text-xs text-primary-foreground opacity-90">
                  <ul className="space-y-1 break-words">
                    <li>• <strong>APP</strong> idealizado em 2015</li>
                    <li>• <strong>Selecionado</strong> para INCUBAÇÃO em 2024</li>
                    <li>• <strong>Empresa</strong> criada em 2025, com 5 pessoas</li>
                    <li>• <strong>INCUBAÇÃO</strong>: abr a out/25, hoje na fase de validação</li>
                  </ul>
                </div>
                
                {/* Espaçamento para alinhar com "Organização e gestão" */}
                <div className="mt-8">
                  <img 
                    src={odsSeal} 
                    alt="Selo ODS"
                    className="block h-auto w-auto max-h-20"
                  />
                </div>
              </div>
              
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-hover mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 PraiAtiva. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/termos-de-uso" className="hover:text-cta transition-colors">
              Termos de Uso
            </Link>
            <Link to="/politica-de-privacidade" className="hover:text-cta transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/contato" className="hover:text-cta transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;