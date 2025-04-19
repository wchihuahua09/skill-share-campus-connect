
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Star } from "lucide-react";

export interface SkillCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    school: string;
  };
  rating: number;
  exchangeCount: number;
  createdAt: string;
}

export function SkillCard({ 
  id, 
  title, 
  description, 
  category, 
  image, 
  user, 
  rating,
  exchangeCount,
  createdAt 
}: SkillCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/skills/${id}`}>
        <CardHeader className="p-0">
          {image ? (
            <div className="relative h-48 w-full">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
              <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90">
                {category}
              </Badge>
            </div>
          ) : (
            <div className="relative h-48 w-full bg-secondary flex items-center justify-center">
              <p className="text-2xl font-semibold text-primary/50">{title.substring(0, 2).toUpperCase()}</p>
              <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90">
                {category}
              </Badge>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-red-500"
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
          
          <div className="flex items-center space-x-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.school}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 border-t border-border flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" /> 
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>{exchangeCount} 次交换</span>
          </div>
          <span>{new Date(createdAt).toLocaleDateString('zh-CN')}</span>
        </CardFooter>
      </Link>
    </Card>
  );
}
