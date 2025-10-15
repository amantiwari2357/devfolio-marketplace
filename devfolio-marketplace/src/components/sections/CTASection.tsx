import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Launch your{" "}
              <span className="text-primary">website & services</span> in minutes
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Build a stunning website, showcase your skills, and start getting clients — all from one dashboard.
            </p>

            <a
              href="#launch"
              className="text-primary hover:underline font-medium inline-flex items-center gap-2"
            >
              Get Started Now 🚀
            </a>
          </div>

          <Card className="bg-card-beige border-none p-8 rounded-3xl">
            <div className="bg-card p-6 rounded-2xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-card-green" />
                <div>
                  <p className="font-semibold">Aman Tiwari</p>
                  <p className="text-sm text-muted-foreground">myportfolio.in/aman</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/90 rounded-2xl p-8 flex items-center justify-center aspect-square mb-6">
              <Zap className="w-24 h-24 text-primary-foreground" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-card-pink" />
                <span>New project inquiry | ₹5,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-card-purple" />
                <span className="italic">Client review received</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-card-green" />
                <span>New website order | ₹12,000</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
