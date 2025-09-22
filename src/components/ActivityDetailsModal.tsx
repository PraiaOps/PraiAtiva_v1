import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Mail
} from "lucide-react";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    title: string;
    locationName: string;
    location: string;
    address?: string;
    instructor: string;
    time: string;
    capacity: string;
    price: string;
    image: string;
    category: 'sea' | 'sand';
    dayOfWeek?: string;
    description?: string;
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
  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {activity.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Imagem da atividade */}
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium ${
              activity.category === 'sea' ? 'bg-blue-500' : 'bg-amber-500'
            } text-white`}>
              {activity.category === 'sea' ? 'No mar' : 'Na areia'}
            </div>
          </div>

          {/* Informações principais */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {activity.locationName}
              </h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{activity.location}</span>
              </div>
              {activity.address && (
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Endereço:</p>
                      <p className="text-sm text-muted-foreground">{activity.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detalhes da atividade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.title)}
                  <div>
                    <p className="font-medium">Tipo de Atividade</p>
                    <p className="text-sm text-muted-foreground">{activity.title}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Horário</p>
                    <p className="text-sm text-muted-foreground capitalize">{activity.time}</p>
                  </div>
                </div>

                {activity.dayOfWeek && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Dia da Semana</p>
                      <p className="text-sm text-muted-foreground">{activity.dayOfWeek}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Capacidade</p>
                    <p className="text-sm text-muted-foreground">{activity.capacity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CircleDollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Preço</p>
                    <p className="text-sm text-muted-foreground">{activity.price}</p>
                  </div>
                </div>

                {activity.instructor && (
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Instrutor</p>
                      <p className="text-sm text-muted-foreground">{activity.instructor}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Descrição */}
            {activity.description && (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Descrição</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            )}

            {/* Informações de contato */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-foreground mb-3">Informações de Contato</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Entre em contato para mais informações</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>Email disponível no perfil do instrutor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fechar
            </Button>
            <Button className="flex-1">
              Inscrever-se
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsModal;
