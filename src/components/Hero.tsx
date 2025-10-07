import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePiNetwork } from "@/hooks/usePiNetwork";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn, loading } = usePiNetwork();
  
  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="gradient-hero absolute inset-0 z-0 opacity-90" />
      
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="text-2xl">🌐</span>
            <span className="text-sm font-medium">Powered by Pi Network</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            GlobalCoverPi
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Delivering dignity, transparency, and community-driven protection for every Pi user
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6 rounded-xl font-semibold group"
                  onClick={() => navigate('/policy')}
                >
                  Get Your Policy
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 rounded-xl font-semibold"
                  onClick={() => navigate('/claim')}
                >
                  File a Claim
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6 rounded-xl font-semibold group"
                  onClick={signIn}
                  disabled={loading}
                >
                  {loading ? 'Connecting...' : 'Connect Pi Wallet'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 rounded-xl font-semibold"
                  onClick={() => {
                    const featuresSection = document.querySelector('#features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
