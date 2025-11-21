import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, MessageCircle, Share2, Heart, MapPin, Award, Loader2 } from "lucide-react";

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
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch experts on component mount
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/experts/all');
        if (!response.ok) {
          throw new Error('Failed to fetch experts');
        }
        const data = await response.json();
        setExperts(data.experts || []);
      } catch (err) {
        console.error('Error fetching experts:', err);
        setError('Failed to load experts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-600">Loading experts...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default ExpertsSection;