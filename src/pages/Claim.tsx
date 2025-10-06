import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Claim = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">📝 File a Claim</CardTitle>
              <CardDescription className="text-lg">
                Submit your claim for processing by your local chapter verifiers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Claim filing functionality will be available once you connect your Pi Network wallet and join a local chapter.
              </p>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
                Connect Pi Wallet to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Claim;
