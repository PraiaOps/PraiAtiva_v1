import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Users, CircleDollarSign, Waves, Trophy, Zap, Dumbbell, Target } from "lucide-react";

interface ActivityCardProps {
  title: string;
  locationName: string;
  location: string;
  instructor: string;
  time: string;
  capacity: string;
  price: string;
  image: string;
  category: 'sea' | 'sand';
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
  instructor, 
  time, 
  capacity, 
  price, 
  image,
  category 
}: ActivityCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium ${
          category === 'sea' ? 'activity-card-sea' : 'activity-card-sand'
        } text-white`}>
          {category === 'sea' ? 'No mar' : 'Na areia'}
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-primary">{locationName}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
          {instructor && <p className="text-xs text-muted-foreground">{instructor}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            {getActivityIcon(title)}
            <span>{title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="capitalize">{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{capacity}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CircleDollarSign className="h-4 w-4 text-primary" />
            <span>{price}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Ver detalhes
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            Inscrever-se
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;