import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  Package, 
  TrendingUp, 
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Utensils
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data
  const overallStats = [
    { 
      label: 'Total Meals Saved', 
      value: '2,847', 
      change: '+12%', 
      icon: Utensils, 
      color: 'text-success',
      trend: 'up' 
    },
    { 
      label: 'Active Volunteers', 
      value: '156', 
      change: '+8%', 
      icon: Users, 
      color: 'text-primary',
      trend: 'up' 
    },
    { 
      label: 'Food Waste Reduced', 
      value: '89%', 
      change: '+5%', 
      icon: TrendingUp, 
      color: 'text-accent',
      trend: 'up' 
    },
    { 
      label: 'Pending Pickups', 
      value: '12', 
      change: '-3%', 
      icon: Clock, 
      color: 'text-warning',
      trend: 'down' 
    }
  ];

  const recentLogs = [
    {
      id: 1,
      staff: 'Rajesh Kumar',
      foodType: 'Rice & Curry',
      quantity: '15 portions',
      location: 'Main Mess',
      status: 'delivered',
      volunteer: 'Green Earth NGO',
      time: '2 hours ago'
    },
    {
      id: 2,
      staff: 'Priya Sharma',
      foodType: 'Fresh Fruits',
      quantity: '8 kg',
      location: 'Food Court',
      status: 'picked-up',
      volunteer: 'Food Angels',
      time: '3 hours ago'
    },
    {
      id: 3,
      staff: 'Mohammed Ali',
      foodType: 'Sandwiches',
      quantity: '20 pieces',
      location: 'Hostel Mess',
      status: 'pending',
      volunteer: 'Not assigned',
      time: '1 hour ago'
    }
  ];

  const hygienealerts = [
    {
      id: 1,
      location: 'Main Mess Hall',
      issue: 'Photo verification missing',
      severity: 'medium',
      time: '30 minutes ago'
    },
    {
      id: 2,
      location: 'Food Court',
      issue: 'Food past pickup time',
      severity: 'high',
      time: '1 hour ago'
    }
  ];

  const topVolunteers = [
    { name: 'Green Earth NGO', pickups: 45, deliveries: 43, rate: '96%' },
    { name: 'Food Angels', pickups: 38, deliveries: 38, rate: '100%' },
    { name: 'Community Kitchen', pickups: 32, deliveries: 30, rate: '94%' },
    { name: 'Hope Foundation', pickups: 28, deliveries: 27, rate: '96%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-success-foreground';
      case 'picked-up': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-subtle min-h-screen">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Food Logs</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Recent Food Logs
                </CardTitle>
                <CardDescription>Latest food redistribution activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{log.foodType}</h4>
                        <p className="text-sm text-muted-foreground">by {log.staff}</p>
                      </div>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Quantity: {log.quantity} • Location: {log.location}</p>
                      <p>Volunteer: {log.volunteer} • {log.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hygiene Alerts */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Hygiene & Compliance
                </CardTitle>
                <CardDescription>Food safety and hygiene monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hygienealerts.map((alert) => (
                  <div key={alert.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{alert.location}</h4>
                        <p className="text-sm text-muted-foreground">{alert.issue}</p>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
                
                <div className="flex items-center gap-2 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium text-success">Compliance Rate: 94%</p>
                    <p className="text-xs text-muted-foreground">All critical issues resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>All Food Logs</CardTitle>
              <CardDescription>Comprehensive view of all food redistribution logs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLogs.map((log) => (
                <div key={log.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{log.foodType}</h4>
                      <p className="text-sm text-muted-foreground">Logged by {log.staff}</p>
                    </div>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Quantity:</strong> {log.quantity}</p>
                    <p><strong>Location:</strong> {log.location}</p>
                    <p><strong>Volunteer:</strong> {log.volunteer}</p>
                    <p><strong>Time:</strong> {log.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Volunteer Performance</CardTitle>
              <CardDescription>Track volunteer activity and success rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topVolunteers.map((volunteer, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{volunteer.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {volunteer.pickups} pickups • {volunteer.deliveries} deliveries
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {volunteer.rate} success
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Export comprehensive reports and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="h-24 flex flex-col items-center justify-center gap-2">
                  <Download className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">Monthly Report</div>
                    <div className="text-xs opacity-80">PDF Format</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">Analytics Export</div>
                    <div className="text-xs opacity-80">Excel Format</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Users className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">Volunteer Report</div>
                    <div className="text-xs opacity-80">PDF Format</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Package className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">Food Logs</div>
                    <div className="text-xs opacity-80">Excel Format</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;