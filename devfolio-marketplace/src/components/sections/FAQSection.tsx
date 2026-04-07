import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This platform helps businesses, freelancers, and service providers easily create professional websites, showcase their services, and manage clients from a single dashboard.",
  },
  {
    question: "Can I sell my services here?",
    answer:
      "Yes! You can list your services, add pricing, and receive bookings or inquiries directly through your website.",
  },
  {
    question: "Do I need technical knowledge to use it?",
    answer:
      "Not at all. Our platform is designed to be beginner-friendly. You can build and manage your website without any coding skills.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are processed securely through integrated gateways. You’ll receive your earnings directly in your bank account once a client makes a purchase or booking.",
  },
  {
    question: "Is there a setup or subscription fee?",
    answer:
      "Creating your account and getting started is free. We only charge a small transaction fee when you successfully receive payments for your services.",
  },
  {
    question: "Can I connect my custom domain?",
    answer:
      "Yes, you can connect your own domain name to make your business look more professional and trustworthy.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-secondary/30 to-background overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 -z-10 w-1/4 h-1/4 bg-primary/5 blur-[100px] rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 animate-slide-up">
           <h2 className="heading-responsive">
            Frequently Asked <span className="text-primary">Questions.</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground font-medium leading-relaxed mt-4 md:mt-6">
            Can't find the answer you are looking for?{" "}
            <a href="/contact" className="text-primary hover:underline font-semibold">
              Get in Touch
            </a>
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-border/40 rounded-2xl md:rounded-[28px] px-5 md:px-8 bg-card/30 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/20 hover:bg-card/50 shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline py-5 md:py-6 text-left font-bold text-sm md:text-base text-foreground leading-tight group">
                <span className="flex-1 group-data-[state=open]:text-primary transition-colors pr-2">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 md:pb-8 pr-4 text-muted-foreground font-medium text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
