import { Users, Wallet, ShieldCheck, Code, Globe2 } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Local Chapters",
    description: "Join a community-based chapter in your area to pool resources and support one another."
  },
  {
    icon: Wallet,
    title: "Monthly Contributions",
    description: "Make small, regular contributions in Pi to maintain your funeral cover policy."
  },
  {
    icon: ShieldCheck,
    title: "Trusted Verification",
    description: "Claims are verified by trusted, nominated members within your local chapter."
  },
  {
    icon: Code,
    title: "Smart Contracts",
    description: "Once a claim is verified, our smart contract automatically triggers a rapid payout."
  },
  {
    icon: Globe2,
    title: "Global Reinsurance",
    description: "Chapters are backed by a global pool, ensuring funds are always available for payouts."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            💡 How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process from contribution to payout
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-6 border-2 border-border hover:border-primary transition-all duration-300 h-full flex flex-col items-center text-center shadow-card hover:shadow-glow">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold shadow-glow">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 z-[-1]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
