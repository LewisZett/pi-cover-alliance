import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Policy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">🎟️ Get Your Policy</CardTitle>
              <CardDescription className="text-lg">
                Join a local chapter and start your microinsurance coverage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Choose from our range of insurance products powered by Pi Network blockchain technology.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Funeral Cover</h3>
                  <p className="text-sm text-muted-foreground">Starting at 10 Pi/month</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg opacity-60">
                  <h3 className="font-semibold text-primary mb-2">Health Insurance</h3>
                  <p className="text-sm text-muted-foreground">Coming Soon</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg opacity-60">
                  <h3 className="font-semibold text-primary mb-2">Auto Insurance</h3>
                  <p className="text-sm text-muted-foreground">Coming Soon</p>
                </div>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
                Connect Pi Wallet to Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Policy;
