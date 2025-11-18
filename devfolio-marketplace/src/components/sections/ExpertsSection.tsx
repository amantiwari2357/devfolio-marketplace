import ExpertCard from "@/components/cards/ExpertCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

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
  const experts: Expert[] = [
    {
      _id: "1",
      firstName: "Rahul",
      lastName: "Sharma",
      role: "Software Engineer",
      profileImage: null,
      skills: ["JavaScript", "React", "Node.js"],
      bio: "Experienced software engineer with 5+ years in web development.",
      email: "rahul.sharma@example.com"
    },
    {
      _id: "2",
      firstName: "Priya",
      lastName: "Patel",
      role: "Data Scientist",
      profileImage: null,
      skills: ["Python", "Machine Learning", "Data Analysis"],
      bio: "Data scientist specializing in AI and predictive modeling.",
      email: "priya.patel@example.com"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("Career");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // ✅ REAL API CALL for ENQUIRY
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/api/enquiries", {
        name: enquiryForm.name,
        email: enquiryForm.email,
        phone: enquiryForm.phone,
        message: enquiryForm.message,
      });

      toast.success("Enquiry submitted successfully!");

      setEnquiryForm({ name: "", email: "", phone: "", message: "" });
      setSelectedExpert(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-primary">Go-To Platform</span> for Experts
          </h2>
          <p className="text-lg text-muted-foreground">
            Experts from every niche use devfolio-marketplace to build trust and grow revenue.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {experts.map((expert) => (
            <Dialog key={expert._id} onOpenChange={() => setSelectedExpert(expert)}>
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
                  
                  {/* Expert Info */}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {expert.firstName} {expert.lastName}
                    </h3>
                    <p className="text-muted-foreground">{expert.role}</p>

                    <h4 className="font-semibold mt-4">Bio</h4>
                    <p className="text-sm text-muted-foreground">{expert.bio}</p>

                    <h4 className="font-semibold mt-4">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enquiry Form */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Send Enquiry</h4>

                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Message</Label>
                        <Textarea
                          rows={4}
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
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
