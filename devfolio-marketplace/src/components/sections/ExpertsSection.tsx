import ExpertCard from "@/components/cards/ExpertCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/services/api";

const categories = [
  "Career", "Data & AI", "Study Abroad", "Software", "HR", "Finance", "Astrology", "Marketing", "Product & Design", "Others"
];

interface Expert {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  skills: string[];
  bio: string;
}

const ExpertsSection = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await api.get('/experts');
        setExperts(response.data.data);
      } catch (err) {
        console.error('Error fetching experts:', err);
        setError('Failed to load experts');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-primary">Go-To Platform</span> for Experts
            </h2>
            <p className="text-lg text-muted-foreground">
              Loading experts...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-primary">Go-To Platform</span> for Experts
            </h2>
            <p className="text-lg text-muted-foreground">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {experts.map((expert) => (
            <ExpertCard
              key={expert._id}
              name={`${expert.firstName} ${expert.lastName}`}
              role={expert.role}
              image={expert.profileImage || null}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
