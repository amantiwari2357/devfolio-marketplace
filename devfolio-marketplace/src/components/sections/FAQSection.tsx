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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Can't find the answer you are looking for?{" "}
            <a href="#contact" className="text-primary hover:underline">
              Reach out to us
            </a>
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="hover:no-underline py-6 text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
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
