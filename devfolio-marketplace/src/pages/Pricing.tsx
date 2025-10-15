import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Unlimited 1:1 sessions",
        "Basic calendar integration",
        "Payment processing",
        "5% platform fee",
        "Email support",
        "Basic analytics"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "₹999",
      period: "per month",
      description: "For growing creators",
      features: [
        "Everything in Free",
        "0% platform fee",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "Webinar hosting",
        "Course creation",
        "Priority DM access"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Business",
      price: "₹2,999",
      period: "per month",
      description: "For established professionals",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom domain",
        "API access",
        "White-label option",
        "Advanced integrations",
        "Team collaboration",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 bg-card border-border relative ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                </div>
                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-foreground text-background hover:bg-foreground/90' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Have Questions?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our team is here to help you find the perfect plan for your needs
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  Contact Sales
                </Button>
                <Button size="lg" variant="outline">
                  View FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
