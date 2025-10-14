import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import ScrollToTopLink from "@/components/ScrollToTopLink";
import logoImage from "@/assets/logo-praiativa-new.jpeg";

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <ScrollToTopLink to="/" className="flex items-center space-x-2">
            <img 
              src={logoImage} 
              alt="PraiAtiva" 
              className="h-6 md:h-8 w-auto"
            />
          </ScrollToTopLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <ScrollToTopLink 
              to="/" 
              className={`hover:text-cta transition-colors ${isActive('/') ? 'text-cta' : ''}`}
            >
              HOME
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/atividades" 
              className={`hover:text-cta transition-colors ${isActive('/atividades') ? 'text-cta' : ''}`}
            >
              ATIVIDADES
            </ScrollToTopLink>
            <ScrollToTopLink 
              to="/sobre" 
              className={`hover:text-cta transition-colors ${isActive('/sobre') ? 'text-cta' : ''}`}
            >
              SOBRE
            </ScrollToTopLink>
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="max-w-[180px] truncate whitespace-nowrap" title={user?.name ?? ''}>Olá, {user?.name}</span>
                </div>
                {/* Mostrar Dashboard apenas para instrutores e admins */}
                {user?.role === 'instrutor' || user?.role === 'admin' ? (
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-primary-foreground hover:text-cta hover:bg-primary-hover">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/perfil">
                    <Button variant="ghost" className="text-primary-foreground hover:text-cta hover:bg-primary-hover">
                      Perfil
                    </Button>
                  </Link>
                )}
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
                <ScrollToTopLink to="/login">
                  <Button variant="ghost" className="text-primary-foreground hover:text-cta hover:bg-primary-hover">
                    Entrar
                  </Button>
                </ScrollToTopLink>
                <ScrollToTopLink to="/cadastro">
                  <Button variant="cta" className="text-primary hover:text-primary">
                    Cadastre-se gratuitamente!
                  </Button>
                </ScrollToTopLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <div className="flex items-center space-x-1 text-xs">
                <User className="h-3 w-3" />
                <span className="max-w-20 truncate">{user?.name}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-foreground hover:text-cta hover:bg-primary-hover p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-hover mt-3 pt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <ScrollToTopLink 
                to="/" 
                className={`py-2 px-1 hover:text-cta transition-colors ${isActive('/') ? 'text-cta' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </ScrollToTopLink>
              <ScrollToTopLink 
                to="/atividades" 
                className={`py-2 px-1 hover:text-cta transition-colors ${isActive('/atividades') ? 'text-cta' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ATIVIDADES
              </ScrollToTopLink>
              <ScrollToTopLink 
                to="/sobre" 
                className={`py-2 px-1 hover:text-cta transition-colors ${isActive('/sobre') ? 'text-cta' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SOBRE
              </ScrollToTopLink>
              <button 
                onClick={() => {
                  document.getElementById('contato')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-1 hover:text-cta transition-colors cursor-pointer text-left"
              >
                CONTATO
              </button>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-primary-hover">
              {isAuthenticated ? (
                <>
                  {/* Mostrar Dashboard apenas para instrutores e admins */}
                  {user?.role === 'instrutor' || user?.role === 'admin' ? (
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-primary-foreground hover:text-cta hover:bg-primary-hover justify-start">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/perfil" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-primary-foreground hover:text-cta hover:bg-primary-hover justify-start">
                        Perfil
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary-foreground hover:text-cta hover:bg-primary-hover justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={isLoggingOut}
                  >
                    <LogOut className={`h-4 w-4 mr-2 ${isLoggingOut ? 'animate-spin' : ''}`} />
                    {isLoggingOut ? 'Saindo...' : 'Sair'}
                  </Button>
                </>
              ) : (
                <>
                  <ScrollToTopLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-primary-foreground hover:text-cta hover:bg-primary-hover">
                      Entrar
                    </Button>
                  </ScrollToTopLink>
                  <ScrollToTopLink to="/cadastro" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="cta" className="w-full text-primary hover:text-primary">
                      Cadastre-se gratuitamente!
                    </Button>
                  </ScrollToTopLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;