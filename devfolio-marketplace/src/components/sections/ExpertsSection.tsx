import ExpertCard from "@/components/cards/ExpertCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  const experts: Expert[] = [
    {
      _id: "1",
      firstName: "Rahul",
      lastName: "Sharma",
      role: "Software Engineer",
      profileImage: null,
      skills: ["JavaScript", "React", "Node.js"],
      bio: "Experienced software engineer with 5+ years in web development, specializing in Indian tech startups.",
      email: "rahul.sharma@example.com"
    },
    {
      _id: "2",
      firstName: "Priya",
      lastName: "Patel",
      role: "Data Scientist",
      profileImage: null,
      skills: ["Python", "Machine Learning", "Data Analysis"],
      bio: "Data scientist specializing in AI and predictive modeling for Indian markets.",
      email: "priya.patel@example.com"
    },
    {
      _id: "3",
      firstName: "Amit",
      lastName: "Kumar",
      role: "Marketing Expert",
      profileImage: null,
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      bio: "Marketing professional helping Indian businesses grow online with localized strategies.",
      email: "amit.kumar@example.com"
    },
    {
      _id: "4",
      firstName: "Anjali",
      lastName: "Singh",
      role: "HR Consultant",
      profileImage: null,
      skills: ["Talent Acquisition", "Employee Relations", "HR Strategy"],
      bio: "HR expert focused on building strong workplace cultures in Indian corporate environments.",
      email: "anjali.singh@example.com"
    },
    {
      _id: "5",
      firstName: "Vikram",
      lastName: "Gupta",
      role: "Financial Advisor",
      profileImage: null,
      skills: ["Investment Planning", "Risk Management", "Financial Analysis"],
      bio: "Certified financial advisor with expertise in wealth management for Indian investors.",
      email: "vikram.gupta@example.com"
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
    // Filter experts by category (skills)
    // For now, we'll just set the category, but you can implement filtering logic
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Enquiry submitted successfully!");
      setEnquiryForm({ name: "", email: "", phone: "", message: "" });
      setSelectedExpert(null);
      setIsSubmitting(false);
    }, 1000);
  };



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
