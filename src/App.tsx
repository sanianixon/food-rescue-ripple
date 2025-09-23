import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import AuthModal from "./components/AuthModal";
import StaffDashboard from "./components/dashboard/StaffDashboard";
import VolunteerDashboard from "./components/dashboard/VolunteerDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";

const queryClient = new QueryClient();

interface User {
  name: string;
  email: string;
  role: 'staff' | 'volunteer' | 'admin';
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<'staff' | 'volunteer' | 'admin' | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleRoleSelect = (role: 'staff' | 'volunteer' | 'admin') => {
    setSelectedRole(role);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
    setSelectedRole(null);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  const renderDashboard = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'staff':
        return <StaffDashboard />;
      case 'volunteer':
        return <VolunteerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <div className="min-h-screen bg-background">
          {user ? (
            <>
              <Navigation 
                userRole={user.role} 
                userName={user.name}
                onLogout={handleLogout}
                notificationCount={3}
              />
              {renderDashboard()}
            </>
          ) : (
            <LandingPage onRoleSelect={handleRoleSelect} />
          )}

          <AuthModal
            isOpen={showAuth}
            onClose={() => setShowAuth(false)}
            role={selectedRole || 'staff'}
            onSuccess={handleAuthSuccess}
          />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
