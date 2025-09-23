import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import logoImage from "@/assets/logo-praiativa.png";

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={logoImage} 
            alt="PraiAtiva" 
            className="h-8 w-auto"
          />
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
          <button 
            onClick={() => {
              document.getElementById('contato')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="hover:text-cta transition-colors cursor-pointer"
          >
            CONTATO
          </button>
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
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className={`h-4 w-4 ${isLoggingOut ? 'animate-spin' : ''}`} />
                {isLoggingOut && <span className="ml-1 text-xs">Saindo...</span>}
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