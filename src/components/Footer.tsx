import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌐</span>
              <span className="text-xl font-bold">GlobalCoverPi</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Delivering dignity, transparency, and community-driven protection for every Pi user.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/claim" className="block text-background/80 hover:text-background transition-colors">
                File a Claim
              </Link>
              <Link to="/policy" className="block text-background/80 hover:text-background transition-colors">
                Get Policy
              </Link>
              <Link to="/contract" className="block text-background/80 hover:text-background transition-colors">
                Smart Contract
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">For Providers</h3>
            <div className="space-y-2">
              <Link to="/verifier" className="block text-background/80 hover:text-background transition-colors">
                Verifier Login
              </Link>
              <Link to="/admin" className="block text-background/80 hover:text-background transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-background/80">
          <p>&copy; 2025 GlobalCoverPi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
