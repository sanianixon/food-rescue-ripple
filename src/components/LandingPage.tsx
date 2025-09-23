import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Heart, BarChart3, ArrowRight, Utensils, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface LandingPageProps {
  onRoleSelect: (role: 'staff' | 'volunteer' | 'admin') => void;
}

const LandingPage = ({ onRoleSelect }: LandingPageProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'staff',
      title: 'Mess/Canteen Staff',
      description: 'Log leftover food and track distributions',
      icon: ChefHat,
      features: ['Log leftover food items', 'Upload hygiene photos', 'Set pickup times', 'View distribution history'],
      bgClass: 'bg-gradient-primary'
    },
    {
      id: 'volunteer',
      title: 'Volunteers & NGOs',
      description: 'Receive notifications and manage pickups',
      icon: Heart,
      features: ['Real-time food notifications', 'Accept/decline pickups', 'Log delivery status', 'Track your impact'],
      bgClass: 'bg-gradient-warm'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Monitor system and generate reports',
      icon: BarChart3,
      features: ['View comprehensive dashboard', 'Generate reports', 'Manage users', 'Analytics & insights'],
      bgClass: 'bg-gradient-subtle'
    }
  ];

  const stats = [
    { icon: Utensils, label: 'Meals Redistributed', value: '2,847' },
    { icon: Users, label: 'Active Volunteers', value: '156' },
    { icon: TrendingUp, label: 'Food Waste Reduced', value: '89%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                RePlate
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              MAHE Food Redistribution Platform
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-4 duration-1000">
              Reducing Food Waste,
              <br />
              <span className="text-accent-light">Feeding Communities</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              Connect MAHE mess halls with volunteers and NGOs to redistribute leftover food efficiently and sustainably.
            </p>
            <div className="flex flex-wrap gap-6 justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-400">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent-light" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role to access the appropriate dashboard and features tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-strong hover:-translate-y-1 ${
                    selectedRole === role.id ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${role.bgClass} flex items-center justify-center shadow-medium`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                    <CardDescription className="text-base">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full group"
                      variant={selectedRole === role.id ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRoleSelect(role.id as 'staff' | 'volunteer' | 'admin');
                      }}
                    >
                      {selectedRole === role.id ? 'Access Dashboard' : 'Select Role'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="bg-muted/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why RePlate?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines food redistribution with real-time coordination and comprehensive tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Real-time Notifications', desc: 'Instant alerts when food is available' },
              { title: 'Hygiene Tracking', desc: 'Photo verification for food safety' },
              { title: 'Impact Analytics', desc: 'Track meals saved and waste reduced' },
              { title: 'Mobile Responsive', desc: 'Access anywhere, anytime' }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;