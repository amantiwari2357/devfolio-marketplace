import { Linkedin, Twitter, Instagram, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/Images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark-section text-dark-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="Devfolio Logo" className="h-36 md:h-40 top-10 w-auto" />
              </a>
            </div>
            
            <Button 
              variant="outline" 
              className="mb-6 bg-transparent border-dark-foreground/20 text-dark-foreground hover:bg-dark-foreground/10"
            >
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
              Top Profiles
            </Button>
            
            <div className="space-y-2 text-sm text-dark-foreground/70">
              <p>gurgaon sector 39, india</p>
              <p>©2025 devfolio-marketplace</p>
            </div>
          </div>
          
          <div>
            <nav className="space-y-4">
              <a href="/about" className="block text-dark-foreground hover:text-primary transition-colors">About</a>
              <a href="/contact" className="block text-dark-foreground hover:text-primary transition-colors">Contact Us</a>
              <a href="/terms" className="block text-dark-foreground hover:text-primary transition-colors">Terms Of Service</a>
              <a href="/privacy" className="block text-dark-foreground hover:text-primary transition-colors">Privacy</a>
            </nav>
          </div>
          
          <div>
            <nav className="space-y-4 mb-8">
              <a href="/pricing" className="block text-dark-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="/blog" className="block text-dark-foreground hover:text-primary transition-colors">Blog</a>
            </nav>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-foreground/10 hover:bg-dark-foreground/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-foreground/10 hover:bg-dark-foreground/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-foreground/10 hover:bg-dark-foreground/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
