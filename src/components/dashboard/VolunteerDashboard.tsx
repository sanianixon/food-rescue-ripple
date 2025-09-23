import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Clock, 
  MapPin, 
  Package, 
  CheckCircle, 
  XCircle, 
  Heart,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerDashboard = () => {
  const { toast } = useToast();
  const [acceptingPickup, setAcceptingPickup] = useState<number | null>(null);

  // Mock data for available food
  const availableFood = [
    {
      id: 1,
      foodType: 'Rice & Curry',
      quantity: '15 portions',
      location: 'Main Mess Hall',
      pickupTime: '2:30 PM',
      postedTime: '10 minutes ago',
      urgency: 'high',
      image: null
    },
    {
      id: 2,
      foodType: 'Fresh Fruits',
      quantity: '8 kg',
      location: 'Food Court',
      pickupTime: '3:00 PM',
      postedTime: '25 minutes ago',
      urgency: 'medium',
      image: null
    },
    {
      id: 3,
      foodType: 'Sandwiches',
      quantity: '12 pieces',
      location: 'Hostel Mess',
      pickupTime: '4:00 PM',
      postedTime: '1 hour ago',
      urgency: 'low',
      image: null
    }
  ];

  // Mock activity data
  const activityStats = [
    { label: 'Pickups This Month', value: '12', icon: Package, color: 'text-primary' },
    { label: 'Meals Delivered', value: '156', icon: Heart, color: 'text-success' },
    { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'text-accent' }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Delivered Rice & Curry',
      quantity: '20 portions',
      location: 'Community Kitchen',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      action: 'Picked up Bread',
      quantity: '10 loaves',
      location: 'Main Mess Hall',
      time: 'Yesterday',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Accepted Fruits pickup',
      quantity: '5 kg',
      location: 'Food Court',
      time: '2 days ago',
      status: 'in-progress'
    }
  ];

  const handleAcceptPickup = (foodId: number) => {
    setAcceptingPickup(foodId);
    
    setTimeout(() => {
      setAcceptingPickup(null);
      toast({
        title: "Pickup accepted!",
        description: "You'll receive pickup details shortly."
      });
    }, 1500);
  };

  const handleDeclinePickup = (foodId: number) => {
    toast({
      title: "Pickup declined",
      description: "The food will remain available for other volunteers."
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'Urgent';
      case 'medium': return 'Moderate';
      case 'low': return 'Low Priority';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-subtle min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activityStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-shadow">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Available Food */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Available Food Pickups
            </CardTitle>
            <CardDescription>
              Real-time notifications of food ready for redistribution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableFood.map((food) => (
              <div key={food.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{food.foodType}</h4>
                    <p className="text-sm text-muted-foreground">{food.postedTime}</p>
                  </div>
                  <Badge className={getUrgencyColor(food.urgency)}>
                    {getUrgencyLabel(food.urgency)}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>{food.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{food.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Pickup by {food.pickupTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleAcceptPickup(food.id)}
                    disabled={acceptingPickup === food.id}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {acceptingPickup === food.id ? "Accepting..." : "Accept Pickup"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeclinePickup(food.id)}
                    disabled={acceptingPickup === food.id}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {availableFood.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No food pickups available at the moment</p>
                <p className="text-sm">You'll be notified when new food becomes available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your recent pickups and deliveries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 border border-border rounded-lg hover:shadow-soft transition-shadow">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-warm text-primary-foreground text-xs">
                    {activity.status === 'completed' ? '✓' : '⏳'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Package className="w-3 h-3" />
                      <span>{activity.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>

                <Badge 
                  variant="secondary" 
                  className={activity.status === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
                >
                  {activity.status === 'completed' ? 'Done' : 'Active'}
                </Badge>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              View Full Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerDashboard;