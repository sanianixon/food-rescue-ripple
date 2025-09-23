import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Camera, Clock, MapPin, Package, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StaffDashboard = () => {
  const { toast } = useToast();
  const [isLogging, setIsLogging] = useState(false);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    pickupTime: '',
    location: '',
    description: '',
    image: null as File | null
  });

  // Mock data for recent logs
  const recentLogs = [
    {
      id: 1,
      foodType: 'Rice & Curry',
      quantity: '15 portions',
      pickupTime: '2:30 PM',
      status: 'Picked up',
      volunteer: 'Green Earth NGO'
    },
    {
      id: 2,
      foodType: 'Bread & Sandwiches',
      quantity: '8 portions',
      pickupTime: '1:00 PM', 
      status: 'Pending',
      volunteer: 'Assigned to Food Angels'
    },
    {
      id: 3,
      foodType: 'Fresh Fruits',
      quantity: '12 kg',
      pickupTime: '11:30 AM',
      status: 'Delivered',
      volunteer: 'Community Kitchen'
    }
  ];

  const stats = [
    { label: 'Today\'s Logs', value: '3', icon: Package, color: 'text-primary' },
    { label: 'Pending Pickups', value: '1', icon: Clock, color: 'text-warning' },
    { label: 'This Week', value: '18', icon: History, color: 'text-success' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLogging(false);
      toast({
        title: "Food logged successfully!",
        description: "Volunteers will be notified about the available food."
      });
      
      // Reset form
      setFormData({
        foodType: '',
        quantity: '',
        pickupTime: '',
        location: '',
        description: '',
        image: null
      });
    }, 1500);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Picked up': return 'bg-primary text-primary-foreground';
      case 'Delivered': return 'bg-success text-success-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-subtle min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
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
        {/* Log Food Form */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Log Leftover Food
            </CardTitle>
            <CardDescription>
              Record available leftover food for redistribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foodType">Food Type</Label>
                  <Select 
                    value={formData.foodType} 
                    onValueChange={(value) => setFormData({...formData, foodType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice & Curry</SelectItem>
                      <SelectItem value="bread">Bread & Sandwiches</SelectItem>
                      <SelectItem value="fruits">Fresh Fruits</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 10 portions, 5kg"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time</Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({...formData, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main-mess">Main Mess Hall</SelectItem>
                      <SelectItem value="food-court">Food Court</SelectItem>
                      <SelectItem value="hostel-mess">Hostel Mess</SelectItem>
                      <SelectItem value="staff-canteen">Staff Canteen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Additional notes about the food condition, dietary info, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Hygiene Photo</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a photo to verify food hygiene and condition
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLogging}>
                {isLogging ? "Logging Food..." : "Log Food for Redistribution"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Recent Food Logs
            </CardTitle>
            <CardDescription>
              Track your recent food redistribution entries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{log.foodType}</h4>
                  <Badge className={getStatusBadgeColor(log.status)}>{log.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Package className="w-3 h-3" />
                    <span>{log.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>Pickup: {log.pickupTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{log.volunteer}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              View All Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;