  import ExpertCard from "@/components/cards/ExpertCard";
  import { Button } from "@/components/ui/button";

  const categories = [
    "Career", "Data & AI", "Study Abroad", "Software", "HR", "Finance", "Astrology", "Marketing", "Product & Design", "Others"
  ];

  const experts = [
    { 
      name: "Saurav Chaudhary", 
      role: "Career Expert", 
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      name: "Sanjeev Kumar", 
      role: "Career Expert", 
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      name: "Nandini Agrawal", 
      role: "Career Expert", 
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      name: "Code Bashers", 
      role: "Web Development Mentor", 
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80" 
    },
   
    { 
      name: "Priya Mehta", 
      role: "Career Coach", 
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80" 
    },
    
  ];

  const ExpertsSection = () => {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-primary">Go-To Platform</span> for Experts
            </h2>
            <p className="text-lg text-muted-foreground">
              Experts from every niche use devfolio-marketplace to build trust, grow revenue, and stay booked.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, idx) => (
              <Button
                key={category}
                variant={idx === 0 ? "default" : "outline"}
                className={idx === 0 ? "bg-foreground text-background hover:bg-foreground/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {experts.map((expert, idx) => (
              <ExpertCard key={idx} {...expert} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default ExpertsSection;
