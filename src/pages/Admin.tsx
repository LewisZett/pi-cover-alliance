import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">🧮 Admin Dashboard</CardTitle>
              <CardDescription className="text-lg">
                Manage chapters, policies, and global reinsurance pool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Administrative access for managing the GlobalCoverPi network and overseeing chapter operations.
              </p>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
                Sign In as Administrator
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
