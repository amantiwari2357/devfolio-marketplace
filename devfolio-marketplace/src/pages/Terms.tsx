import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-8 text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <Card className="p-8 bg-card border-border">
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using devfolio-marketplace's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  devfolio-marketplace provides a platform for creators to connect with their audience through various services including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>One-on-one mentoring sessions</li>
                  <li>Group webinars and workshops</li>
                  <li>Digital courses and content</li>
                  <li>Priority messaging services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All payments are processed securely through our payment partners. Platform fees and commissions vary based on your subscription plan. Creators are responsible for any applicable taxes on their earnings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Content Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Creators retain ownership of their content but grant devfolio-marketplace a license to host, display, and distribute the content through our platform. All content must comply with our community guidelines and applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cancellation and Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Refund policies are set by individual creators for their services. Platform subscriptions can be cancelled at any time, with no refunds for partial months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  devfolio-marketplace acts as a platform facilitating connections between creators and users. We are not responsible for the quality, accuracy, or legality of content provided by creators.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notification.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, please contact us at legal@devfolio-marketplace.io
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
