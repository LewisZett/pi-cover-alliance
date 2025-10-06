import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contract = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">🔐 Smart Contract</CardTitle>
              <CardDescription className="text-lg">
                Transparent, automated, and secure policy management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-foreground mb-3">How Our Smart Contracts Work</h3>
                <p className="text-muted-foreground mb-4">
                  GlobalCoverPi uses smart contracts on the Pi Network blockchain to ensure transparent, 
                  automated, and tamper-proof insurance operations.
                </p>
                
                <div className="bg-secondary p-6 rounded-xl space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-primary font-semibold">Contract Address:</span>
                    <br />
                    <span className="text-muted-foreground">0x1234...5678 (Mainnet)</span>
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Network:</span>
                    <br />
                    <span className="text-muted-foreground">Pi Network Blockchain</span>
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Status:</span>
                    <br />
                    <span className="text-accent font-semibold">Active & Verified</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">Key Functions:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Automated premium collection</li>
                  <li>✓ Claim verification and approval workflow</li>
                  <li>✓ Instant payout execution</li>
                  <li>✓ Global reinsurance pool management</li>
                  <li>✓ Chapter governance and voting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contract;
