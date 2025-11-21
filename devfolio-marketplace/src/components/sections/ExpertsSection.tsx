import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, MessageCircle, Share2, Heart, MapPin, Award } from "lucide-react";

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
  rating?: number;
  connections?: number;
  experience?: string;
  location?: string;
}

const ExpertsSection = () => {
  const experts: Expert[] = [
    {
      _id: "1",
      firstName: "Rahul",
      lastName: "Sharma",
      role: "Senior Software Engineer",
      profileImage: null,
      skills: ["JavaScript", "React", "Node.js", "System Design"],
      bio: "Experienced software engineer with 5+ years in web development. Specialized in building scalable products.",
      email: "rahul.sharma@example.com",
      rating: 4.9,
      connections: 342,
      experience: "5+ years",
      location: "Bangalore, India"
    },
    {
      _id: "2",
      firstName: "Priya",
      lastName: "Patel",
      role: "Data Scientist & ML Engineer",
      profileImage: null,
      skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
      bio: "Data scientist specializing in AI and predictive modeling. Helped 50+ startups scale their ML pipelines.",
      email: "priya.patel@example.com",
      rating: 4.8,
      connections: 289,
      experience: "4+ years",
      location: "Mumbai, India"
    },
    {
      _id: "3",
      firstName: "Arjun",
      lastName: "Singh",
      role: "Career Coach & HR Strategist",
      profileImage: null,
      skills: ["Career Guidance", "Resume Building", "Interview Prep", "Leadership"],
      bio: "Helped 500+ professionals land their dream jobs. Expertise in tech and finance domains.",
      email: "arjun.singh@example.com",
      rating: 4.7,
      connections: 512,
      experience: "6+ years",
      location: "Delhi, India"
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("https://devfolio-marketplace-1.onrender.com/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiryForm.name,
          email: enquiryForm.email,
          phone: enquiryForm.phone,
          message: enquiryForm.message,
        }),
      });

      if (res.ok) {
        toast.success("Connection request sent successfully! 🎉");
        setEnquiryForm({ name: "", email: "", phone: "", message: "" });
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to send connection request");
      }
    } catch (error) {
      toast.error("Error sending connection request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Connect with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Top Experts</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get guidance from industry experts. Share your goals, get personalized advice, and accelerate your growth.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category ? "bg-blue-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Dialog key={expert._id} open={isDialogOpen && selectedExpert?._id === expert._id} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div
                  onClick={() => setSelectedExpert(expert)}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-slate-100"
                >
                  {/* Profile Header */}
                  <div className="h-28 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all"></div>

                  {/* Profile Content */}
                  <div className="px-6 pb-6 -mt-12 relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg border-4 border-white">
                      {expert.firstName[0]}{expert.lastName[0]}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{expert.firstName} {expert.lastName}</h3>
                    <p className="text-sm text-blue-600 font-semibold mb-3">{expert.role}</p>

                    {/* Rating & Connections */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{expert.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{expert.connections} connections</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{expert.location}</span>
                    </div>

                    {/* Experience Badge */}
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      <Award className="w-3 h-3" />
                      {expert.experience}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.skills.slice(0, 2).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                      {expert.skills.length > 2 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                          +{expert.skills.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{expert.bio}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExpert(expert);
                          setIsDialogOpen(true);
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Connect with {expert.firstName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Expert Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                        {expert.firstName[0]}{expert.lastName[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{expert.firstName} {expert.lastName}</h3>
                        <p className="text-blue-600 font-semibold text-sm mb-2">{expert.role}</p>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {expert.rating} ({expert.connections} connections)
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {expert.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio & Skills */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">About</h4>
                    <p className="text-slate-600 text-sm mb-4">{expert.bio}</p>

                    <h4 className="font-semibold text-slate-900 mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connection Request Form */}
                  <div className="bg-slate-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-4">Send Connection Request</h4>

                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      <div>
                        <Label className="text-slate-700 font-semibold">Full Name *</Label>
                        <Input
                          placeholder="Enter your name"
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 font-semibold">Email *</Label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 font-semibold">Phone *</Label>
                        <Input
                          placeholder="+91 XXXXX XXXXX"
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-700 font-semibold">Tell them about your goals *</Label>
                        <Textarea
                          placeholder="What would you like to discuss with this expert? Share your goals, challenges, or specific topics you'd like guidance on..."
                          rows={4}
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                          required
                          className="mt-2 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending Connection Request..." : "Send Connection Request"}
                      </Button>

                      <p className="text-xs text-slate-500 text-center">
                        ✓ The expert will receive your message and respond within 24 hours
                      </p>
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