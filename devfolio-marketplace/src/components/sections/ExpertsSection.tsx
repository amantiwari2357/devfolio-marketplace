import ExpertCard from "@/components/cards/ExpertCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  email: string;
}

const ExpertsSection = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Career");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await api.get('/experts');
        setExperts(response.data.data.experts || response.data.data);
      } catch (err) {
        console.error('Error fetching experts:', err);
        setError('Failed to load experts');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Filter experts by category (skills)
    // For now, we'll just set the category, but you can implement filtering logic
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert) return;

    setIsSubmitting(true);
    try {
      await api.post('/enquiries', {
        expert: selectedExpert._id,
        ...enquiryForm
      });
      toast.success("Enquiry submitted successfully!");
      setEnquiryForm({ name: "", email: "", phone: "", message: "" });
      setSelectedExpert(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "bg-foreground text-background hover:bg-foreground/90" : ""}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {experts.map((expert) => (
            <Dialog key={expert._id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <ExpertCard
                    name={`${expert.firstName} ${expert.lastName}`}
                    role={expert.role}
                    image={expert.profileImage || null}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Expert Details</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expert Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {expert.firstName[0]}{expert.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{expert.firstName} {expert.lastName}</h3>
                        <p className="text-muted-foreground">{expert.role}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Bio</h4>
                      <p className="text-sm text-muted-foreground">{expert.bio}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {expert.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enquiry Form */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Send Enquiry</h4>
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Submitting..." : "Send Enquiry"}
                      </Button>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
