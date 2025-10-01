import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Users, CircleDollarSign, Waves, Trophy, Zap, Dumbbell, Target, Wrench } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import ActivityDetailsModal from "./ActivityDetailsModal";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface ActivityCardProps {
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
}

const getActivityIcon = (title: string) => {
  switch (title) {
    case "Beach Tennis":
      return <Target className="h-4 w-4 text-primary" />;
    case "Beach Volley":
      return <Trophy className="h-4 w-4 text-primary" />;
    case "Futebol":
      return <Zap className="h-4 w-4 text-primary" />;
    case "Canoa Havaiana":
      return <Waves className="h-4 w-4 text-primary" />;
    case "Musculação":
      return <Dumbbell className="h-4 w-4 text-primary" />;
    default:
      return <Target className="h-4 w-4 text-primary" />;
  }
};

const ActivityCard = ({ 
  title, 
  locationName,
  location, 
  address,
  city,
  state,
  neighborhood,
  beach,
  instructor, 
  time, 
  capacity, 
  price, 
  image,
  category,
  dayOfWeek,
  description,
  socials,
  contact
}: ActivityCardProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEnrollPopoverOpen, setIsEnrollPopoverOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleViewDetails = () => {
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <Card className="card-hover overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover ${title === 'Vela' ? 'object-[50%_10%]' : ''}`}
        />
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium ${
          category === 'sea' ? 'activity-card-sea' : 'activity-card-sand'
        } text-white`}>
          {category === 'sea' ? 'No mar' : 'Na areia'}
        </div>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="font-semibold text-lg text-primary">{locationName}</h3>
            <p className="text-sm text-muted-foreground">{location}</p>
            {instructor && <p className="text-xs text-muted-foreground">{instructor}</p>}
          </div>
          
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              {getActivityIcon(title)}
              <span>{title}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-4 mt-auto">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleViewDetails}>
            Ver detalhes
          </Button>
          {isMobile ? (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Funcionalidade em desenvolvimento",
                  description: "Disponível em breve",
                });
              }}
            >
              Inscrever-se
            </Button>
          ) : (
            <Popover open={isEnrollPopoverOpen} onOpenChange={setIsEnrollPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsEnrollPopoverOpen(true)}
                  onMouseLeave={() => setIsEnrollPopoverOpen(false)}
                >
                  Inscrever-se
                </Button>
              </PopoverTrigger>
              <PopoverContent align="center" sideOffset={8} className="w-44 p-2 text-center rounded-sm">
                <div className="flex flex-col items-center">
                  <Wrench className="h-4 w-4 text-muted-foreground mb-1" />
                  <div className="text-xs font-medium leading-tight">Funcionalidade em desenvolvimento</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Disponível em breve</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </CardContent>
      
      <ActivityDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseModal}
        activity={{
          title,
          locationName,
          location,
          address,
          city,
          state,
          neighborhood,
          beach,
          instructor,
          time,
          capacity,
          price,
          image,
          category,
          dayOfWeek,
          description,
          socials,
          contact
        }}
      />
      
    </Card>
  );
};

export default ActivityCard;