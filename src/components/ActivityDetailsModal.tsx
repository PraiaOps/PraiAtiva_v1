import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  MapPin, 
  Clock, 
  Users, 
  CircleDollarSign, 
  User, 
  Calendar,
  Waves, 
  Trophy, 
  Zap, 
  Dumbbell, 
  Target,
  Phone,
  Mail,
  Wrench
} from "lucide-react";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    title: string;
    locationName: string;
    location: string;
    address?: string;
    city?: string;
    state?: string;
    neighborhood?: string;
    beach?: string;
    instructor: string;
    time: string;
    capacity: string;
    price: string;
    image: string;
    category: 'sea' | 'sand';
    dayOfWeek?: string;
    description?: string;
    socials?: string;
    contact?: string;
  };
}

const getActivityIcon = (title: string) => {
  switch (title) {
    case "Beach Tennis":
      return <Target className="h-5 w-5 text-primary" />;
    case "Vôlei de Praia":
      return <Trophy className="h-5 w-5 text-primary" />;
    case "Futevôlei":
      return <Zap className="h-5 w-5 text-primary" />;
    case "Canoa Havaiana":
      return <Waves className="h-5 w-5 text-primary" />;
    case "Vela":
      return <Waves className="h-5 w-5 text-primary" />;
    case "Circuito Funcional":
      return <Dumbbell className="h-5 w-5 text-primary" />;
    default:
      return <Target className="h-5 w-5 text-primary" />;
  }
};

const ActivityDetailsModal = ({ isOpen, onClose, activity }: ActivityDetailsModalProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  if (!activity) return null;

  const socials = activity.socials?.trim() || '';
  const contact = activity.contact?.trim() || '';

  const formatCityState = (city?: string, state?: string) => {
    const c = city?.trim();
    const s = state?.trim();
    if (c && s) return `${c}/${s}`;
    if (c) return c;
    if (s) return s;
    return '';
  };

  const handleEnroll = () => {
    if (isMobile) {
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "Disponível em breve",
      });
    } else {
      // Para desktop, poderia mostrar um popover ou modal específico
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "Disponível em breve",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-primary">
            {activity.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Imagem da atividade */}
          <div className="relative h-40 md:h-48 rounded-lg overflow-hidden">
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-2 left-2 md:top-3 md:left-3 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${
              activity.category === 'sea' ? 'bg-blue-500' : 'bg-amber-500'
            } text-white`}>
              {activity.category === 'sea' ? 'No mar' : 'Na areia'}
            </div>
          </div>

          {/* Informações principais seguindo o roteiro */}
          <div className="space-y-4">
            {/* Nome do local de atuação */}
            <h3 className="text-lg md:text-xl font-semibold text-primary">
              {activity.locationName}
            </h3>

            {/* Cidade/Estado + Bairro + Praia */}
            {(activity.city || activity.state || activity.neighborhood || activity.beach) && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm md:text-base">
                  {formatCityState(activity.city, activity.state)}
                  {activity.neighborhood ? `, ${activity.neighborhood}` : ''}
                  {activity.beach ? `, Praia ${activity.beach}` : ''}
                </span>
              </div>
            )}

            {/* Endereço/referência */}
            {activity.address && activity.address.trim().length > 0 && (
              <div className="p-2 md:p-3 bg-muted rounded-lg">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs md:text-sm font-medium text-foreground">Endereço/referência</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{activity.address}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Detalhes da atividade */}
            {/* Horários */}
            {(
              (activity.time && activity.time.trim() !== '' && activity.time.trim().toLowerCase() !== 'null') ||
              (activity.dayOfWeek && activity.dayOfWeek.trim() !== '' && activity.dayOfWeek.trim().toLowerCase() !== 'null')
            ) ? (
              <div className="space-y-1">
                <h4 className="text-sm md:text-base font-medium text-foreground">Horários</h4>
                <div className="flex items-center space-x-2 md:space-x-3 text-muted-foreground text-xs md:text-sm">
                  {activity.dayOfWeek && activity.dayOfWeek.trim() !== '' && activity.dayOfWeek.trim().toLowerCase() !== 'null' && (
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-primary" />{activity.dayOfWeek}</span>
                  )}
                  {activity.time && activity.time.trim() !== '' && activity.time.trim().toLowerCase() !== 'null' && (
                    <span className="flex items-center"><Clock className="h-4 w-4 mr-1 text-primary" />{activity.time}</span>
                  )}
                </div>
              </div>
            ) : null}

            {/* Descrição/observação */}
            {activity.description && activity.description.trim().length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm md:text-base font-medium text-foreground">Descrição/observação</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
              </div>
            )}

            {/* Redes sociais */}
            {socials && socials.trim().length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm md:text-base font-medium text-foreground">Redes sociais</h4>
                <p className="text-xs md:text-sm text-muted-foreground break-words">{socials}</p>
              </div>
            )}

            {/* Informações de contato */}
            {contact && contact.trim().length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm md:text-base font-medium text-foreground">Informações de contato</h4>
                <p className="text-xs md:text-sm text-muted-foreground break-words">{contact}</p>
              </div>
            )}

          
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-3 md:pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="w-full md:flex-1">
              Fechar
            </Button>
            <Button 
              className="w-full md:flex-1" 
              onClick={handleEnroll}
            >
              <Wrench className="h-4 w-4 mr-2" />
              Inscrever-se
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsModal;
