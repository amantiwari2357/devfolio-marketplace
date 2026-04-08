import { Linkedin, Twitter, Instagram, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/Images/logo_optimized.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 pt-12 md:pt-20 pb-8 md:pb-10" aria-label="Site Footer">
      <div className="container mx-auto px-6 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-16 mb-12 md:mb-20">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 group">
              <a href="/" className="flex flex-col items-start gap-4">
                <img src={logo} alt="Devfolio Logo" width={48} height={12} loading="lazy" className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-300" />
              </a>
            </div>
            
            <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 pr-4">
              Building the next generation of digital solutions for individuals and brands worldwide.
            </p>

            <a href="/search" className="inline-block mt-2">
              <Button 
                variant="outline" 
                className="rounded-xl border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all shadow-sm text-sm h-12 px-6"
              >
                <Star className="w-4 h-4 mr-2 fill-current" />
                Explore Elite Profiles
              </Button>
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-5 text-foreground">System Node</h4>
            <nav className="space-y-3">
              {["Use Cases", "Search", "Listing", "Pricing"].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`} 
                  className="group flex items-center text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 md:group-hover:opacity-100 transition-all -translate-y-0.5" />
                </a>
              ))}
            </nav>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-sm mb-5 text-foreground">Identity Flow</h4>
            <nav className="space-y-3">
              {["About", "Blog", "Contact", "Terms", "Privacy"].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="group flex items-center text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 md:group-hover:opacity-100 transition-all -translate-y-0.5" />
                </a>
              ))}
            </nav>
          </div>
          
          {/* Contact & Socials */}
          <div className="col-span-2 md:col-span-1 pt-4 md:pt-0 border-t md:border-t-0 border-border/10 md:border-none">
            <h4 className="font-semibold text-sm mb-5 text-foreground">Frequency Connect</h4>
            <div className="space-y-6">
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                GURGAON SECTOR 39, INDIA<br/>
                <a href="tel:9031359720" className="text-foreground hover:text-primary transition-colors block mt-2">+91 9031359720</a>
                <a href="mailto:devfoliomarketplace@gmail.com" className="text-foreground hover:text-primary transition-colors block mt-1">support@devfoliomarketplace.com</a>
              </p>
              
              <div className="flex gap-4">
                {[
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/aman-tiwari-7a87323b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                  { Icon: Twitter, href: "https://x.com/amantiwari2357" },
                  { Icon: Instagram, href: "https://www.instagram.com/amantiwari2357/" }
                ].map(({ Icon, href }, idx) => (
                  <a 
                    key={idx}
                    href={href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${Icon.name || "social media"} profile`}
                    className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-sm group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs md:text-sm font-medium text-muted-foreground">
            © {currentYear} Devfolio Marketplace. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">Built with Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
