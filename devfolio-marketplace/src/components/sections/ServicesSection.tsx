import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const services = [
  {
    number: "01",
    title: "Custom Website Development",
    description:
      "From portfolio sites to dynamic business platforms — I design and develop fast, responsive, and SEO-friendly websites that help your brand stand out.",
  },
  {
    number: "02",
    title: "Full Stack Application Development",
    description:
      "I build modern web applications using the latest technologies like React, Node.js, and MongoDB — ensuring performance, scalability, and security.",
  },
  {
    number: "03",
    title: "UI/UX Design & Prototyping",
    description:
      "Crafting intuitive and user-centered designs that enhance engagement and bring your product vision to life.",
  },
  {
    number: "04",
    title: "Maintenance & Optimization",
    description:
      "Keep your website updated, secure, and performing at its best. I handle regular maintenance, bug fixes, and speed optimization.",
  },
  {
    number: "05",
    title: "Branding & Digital Presence",
    description:
      "From domain setup to SEO and analytics — I help you build a strong digital presence that converts visitors into clients.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Booking Card */}
          <div className="lg:sticky lg:top-32">
            <Card className="bg-card-pink border-none p-8 rounded-3xl shadow-md">
              <div className="bg-card p-6 rounded-2xl mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-card-pink" />
                  <div>
                    <p className="font-semibold text-sm">Book a Consultation</p>
                    <p className="text-xs text-muted-foreground">
                      Discuss your project idea
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {["Fri\n15 Oct", "Sat\n16 Oct", "Sun\n17 Oct", "Mon\n18 Oct"].map(
                    (date, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg text-center text-xs ${
                          idx === 1
                            ? "bg-foreground text-background"
                            : "bg-muted"
                        }`}
                      >
                        {date.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    )
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Next available</span>
                    <br />
                    <span className="font-semibold">07:00pm, Tue 21st</span>
                  </p>
                  <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            </Card>
          </div>
          

          {/* Right Side - Services Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-4"
            >
              {services.map((service, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-border pb-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-primary font-semibold">
                        {service.number}
                      </span>
                      <span className="text-xl font-semibold">
                        {service.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 text-muted-foreground">
                    {service.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
