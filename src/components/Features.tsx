import { Zap, Link2, Globe, TrendingUp, PiSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Fast Payouts",
    description: "Claims are processed swiftly through our decentralized network, ensuring support when it's needed most."
  },
  {
    icon: Link2,
    title: "Transparent Tracking",
    description: "All contributions and payouts are recorded on the Pi blockchain for complete transparency."
  },
  {
    icon: Globe,
    title: "Diaspora-Friendly",
    description: "Members can protect family back home, overcoming cross-border remittance challenges."
  },
  {
    icon: TrendingUp,
    title: "Scalable Coverage",
    description: "We're expanding from funeral cover to health, auto, and life insurance products."
  },
  {
    icon: PiSquare,
    title: "Powered by Pi",
    description: "Leveraging the power of the Pi Network for secure, low-cost, and accessible insurance."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            ✨ Key Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for the community, powered by blockchain technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-glow group cursor-pointer animate-slide-up gradient-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
