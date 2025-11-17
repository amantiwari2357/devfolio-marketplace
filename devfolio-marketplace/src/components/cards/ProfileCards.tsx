import { Card } from "@/components/ui/card";

const profiles = [
  { 
    name: "Rohit Sharma", 
    role: "Full Stack Developer", 
    badge: "TCS", 
    color: "bg-card-green",
    linkedin: "https://www.linkedin.com/in/rohit-sharma-12345678/"
  },
  { 
    name: "Neha Verma", 
    role: "Digital Marketing Expert", 
    badge: "Google Partner", 
    color: "bg-card-pink",
    linkedin: "https://www.linkedin.com/in/neha-verma-12345678/"
  },
  { 
    name: "Arjun Patel", 
    role: "Career & Life Coach", 
    badge: "MindPath", 
    color: "bg-card-yellow",
    linkedin: "https://www.linkedin.com/in/arjun-patel-12345678/"
  },
  { 
    name: "Priya Nair", 
    role: "UI/UX Designer", 
    badge: "Zoho", 
    color: "bg-card-pink",
    linkedin: "https://www.linkedin.com/in/priya-nair-12345678/"
  },
  { 
    name: "Ankit Mehta", 
    role: "Software Engineer", 
    badge: "Infosys", 
    color: "bg-card-green",
    linkedin: "https://www.linkedin.com/in/ankit-mehta-12345678/"
  },
  { 
    name: "Simran Kaur", 
    role: "Business Consultant", 
    badge: "IIM Ahmedabad", 
    color: "bg-card-yellow",
    linkedin: "https://www.linkedin.com/in/simran-kaur-12345678/"
  },
];

const ProfileCards = () => {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4">
        {profiles.map((profile, idx) => (
          <Card 
            key={idx}
            className={`${profile.color} border-none p-4 hover:scale-105 transition-transform duration-300 shadow-sm cursor-pointer`}
            onClick={() => window.open(profile.linkedin, '_blank', 'noopener,noreferrer')}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">{profile.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{profile.role}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-background/70 rounded-full text-xs font-medium">
                  {profile.badge}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileCards;
