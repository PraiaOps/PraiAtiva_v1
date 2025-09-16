import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityCardProps {
  title: string;
  location: string;
  instructor: string;
  time: string;
  capacity: string;
  price: string;
  image: string;
  category: 'sea' | 'sand';
}

const ActivityCard = ({ 
  title, 
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
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{instructor}</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Local:</span>
            <span>{location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horário:</span>
            <span>{time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Capacidade:</span>
            <span>{capacity}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-muted-foreground">Preço:</span>
            <span className="text-primary">{price}</span>
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