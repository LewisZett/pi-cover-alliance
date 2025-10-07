import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Settings, Ticket, Code, LogOut } from "lucide-react";
import { usePiNetwork } from "@/hooks/usePiNetwork";

const navItems = [
  { path: "/claim", label: "File a Claim", icon: FileText },
  { path: "/verifier", label: "Verifier Login", icon: Shield },
  { path: "/admin", label: "Admin Login", icon: Settings },
  { path: "/policy", label: "Get Policy", icon: Ticket },
  { path: "/contract", label: "Smart Contract", icon: Code }
];

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated, user, signIn, signOut, loading } = usePiNetwork();
  
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🌐</span>
            <span className="text-xl font-bold text-primary">GlobalCoverPi</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                @{user?.pi_username || 'User'}
              </span>
              <Button 
                variant="outline"
                size="sm"
                onClick={signOut}
                disabled={loading}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow gap-2"
              onClick={signIn}
              disabled={loading}
            >
              <span>🥧</span>
              {loading ? 'Connecting...' : 'Connect Pi Wallet'}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
