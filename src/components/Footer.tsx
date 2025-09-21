import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-cta">Prai</span>Ativa
            </div>
            <p className="text-sm text-primary-light opacity-90">
              Conectando pessoas a atividades ao ar livre nas mais belas praias do Brasil.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-primary-hover"
                onClick={() => window.open('https://www.instagram.com/praiativa/', '_blank')}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-primary-hover"
                onClick={() => window.open('https://www.facebook.com/praiativa/?ref=pl_edit_xav_ig_profile_page_web#', '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-primary-hover"
                onClick={() => window.open('https://www.youtube.com/@praiativasuaatividadesuapr3965', '_blank')}
              >
                <Youtube className="h-4 w-4" />
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
              <Link to="/contato" className="block text-sm hover:text-cta transition-colors">
                Contato
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
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

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-cta">Newsletter</h3>
            <p className="text-sm text-primary-light opacity-90">
              Fique por dentro das novidades e promoções.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Seu e-mail" 
                className="bg-primary-hover border-primary-light text-primary-foreground placeholder:text-primary-light"
              />
              <Button variant="cta" size="sm">
                Assinar
              </Button>
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
            <Link to="/faq" className="hover:text-cta transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;