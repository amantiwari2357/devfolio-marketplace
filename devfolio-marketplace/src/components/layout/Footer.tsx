import { Linkedin, Twitter, Instagram, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/Images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-20">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-8 group">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="Devfolio Logo" className="h-40 w-auto group-hover:scale-105 transition-transform duration-300" />
                <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                  DEVFOLIO<span className="text-primary">.</span>
                </span>
              </a>
            </div>
            
            <p className="text-muted-foreground text-xs font-bold leading-relaxed mb-8 pr-4 italic uppercase tracking-wider opacity-60">
              Building the next generation of digital solutions for individuals and brands worldwide.
            </p>

            <Button 
              variant="outline" 
              className="rounded-xl border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground font-black transition-all shadow-sm text-[10px] uppercase tracking-widest h-12 px-6 italic"
            >
              <Star className="w-3.5 h-3.5 mr-2 fill-current" />
              Explore Elite Profiles
            </Button>
          </div>
          
          {/* Quick Links */}
          <div className="pt-8 md:pt-0">
            <h4 className="font-black text-xs mb-8 tracking-[0.2em] uppercase italic opacity-40">System Node</h4>
            <nav className="space-y-4">
              {["Use Cases", "Search", "Listing", "Pricing"].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`} 
                  className="group flex items-center text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                </a>
              ))}
            </nav>
          </div>

          {/* Company Links */}
          <div className="pt-8 md:pt-0">
            <h4 className="font-black text-xs mb-8 tracking-[0.2em] uppercase italic opacity-40">Identity Flow</h4>
            <nav className="space-y-4">
              {["About", "Blog", "Contact", "Terms", "Privacy"].map((item) => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="group flex items-center text-muted-foreground hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest italic"
                >
                  {item}
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
                </a>
              ))}
            </nav>
          </div>
          
          {/* Contact & Socials */}
          <div className="col-span-2 md:col-span-1 pt-12 md:pt-0 border-t md:border-t-0 border-border/20">
            <h4 className="font-black text-xs mb-8 tracking-[0.2em] uppercase italic opacity-40">Frequency Connect</h4>
            <div className="space-y-6">
              <p className="text-muted-foreground text-xs font-bold italic uppercase tracking-widest">
                GURGAON SECTOR 39, INDIA<br/>
                <span className="text-foreground NOT-italic">hello@devfolio.me</span>
              </p>
              
              <div className="flex gap-4">
                {[Linkedin, Twitter, Instagram].map((Icon, idx) => (
                  <a 
                    key={idx}
                    href="#" 
                    className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-sm group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            © {currentYear} Devfolio Marketplace. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Built with Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
