import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Verifier = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">🛡️ Verifier Portal</CardTitle>
              <CardDescription className="text-lg">
                Access the verification dashboard for your local chapter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Trusted verifiers help maintain the integrity of the GlobalCoverPi network by reviewing and approving claims.
              </p>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
                Sign In as Verifier
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Verifier;
