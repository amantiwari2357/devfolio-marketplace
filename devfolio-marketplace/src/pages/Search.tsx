import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon, Filter } from "lucide-react";

const Search = () => {
  const experts = [
    { name: "Sarah Johnson", expertise: "Product Management", rating: 4.9, sessions: 150 },
    { name: "Michael Chen", expertise: "Software Engineering", rating: 4.8, sessions: 200 },
    { name: "Emily Rodriguez", expertise: "UI/UX Design", rating: 5.0, sessions: 180 },
    { name: "David Kim", expertise: "Marketing Strategy", rating: 4.7, sessions: 120 },
    { name: "Lisa Anderson", expertise: "Career Coaching", rating: 4.9, sessions: 250 },
    { name: "James Wilson", expertise: "Data Science", rating: 4.8, sessions: 140 },
  ];

  const categories = ["All", "Technology", "Business", "Design", "Marketing", "Career", "Lifestyle"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl font-bold mb-6 text-center text-foreground">
              Find Your Expert
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-8">
              Connect with top professionals across various domains
            </p>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, expertise, or skill..."
                  className="pl-12 h-14 text-lg"
                />
              </div>
              <Button size="lg" variant="outline" className="gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-card-${index % 2 === 0 ? 'purple' : 'blue'} to-card-${index % 2 === 0 ? 'pink' : 'cyan'}`}></div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.expertise}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{expert.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{expert.sessions}+ sessions</span>
                </div>
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
