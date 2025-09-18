import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

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
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span>Olá, {user?.name}</span>
              </div>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-primary-foreground hover:text-cta hover:bg-primary-hover">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:text-cta hover:bg-primary-hover"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;