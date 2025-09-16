import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary text-primary-foreground shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold">
            <span className="text-cta">prai</span>
            <span>ativa</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`hover:text-cta transition-colors ${isActive('/') ? 'text-cta' : ''}`}
          >
            HOME
          </Link>
          <Link 
            to="/atividades" 
            className={`hover:text-cta transition-colors ${isActive('/atividades') ? 'text-cta' : ''}`}
          >
            ATIVIDADES
          </Link>
          <Link 
            to="/sobre" 
            className={`hover:text-cta transition-colors ${isActive('/sobre') ? 'text-cta' : ''}`}
          >
            SOBRE
          </Link>
          <Link 
            to="/contato" 
            className={`hover:text-cta transition-colors ${isActive('/contato') ? 'text-cta' : ''}`}
          >
            CONTATO
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" className="text-primary-foreground hover:text-cta hover:bg-primary-hover">
              Entrar
            </Button>
          </Link>
          <Link to="/cadastro">
            <Button variant="cta">
              Cadastrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;