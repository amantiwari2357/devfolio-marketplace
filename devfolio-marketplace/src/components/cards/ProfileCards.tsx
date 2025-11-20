import { Card } from "@/components/ui/card";

const profiles = [
  { 
    name: "Krishna Upadhyay", 
    role: "DevOps Engineer", 
    badge: "TCS", 
    color: "bg-card-green",
    linkedin: "https://www.linkedin.com/in/krishna-upadhyay-12345678/"
  },
  { 
    name: "Vaibhav Koushik", 
    role: "Full Stack Developer", 
    badge: "scaller", 
    color: "bg-card-pink",
    linkedin: "https://www.linkedin.com/in/vaibhav-koushik-12345678/"
  },
  { 
    name: "Aman Tiwari", 
    role: "Full Stack Developer", 
    badge: "100acress.com", 
    color: "bg-card-yellow",
    linkedin: "https://www.linkedin.com/in/aman-tiwari-12345678/"
  },
  { 
    name: "Aman Mishra", 
    role: "Full Stack Developer", 
    badge: "75way technologies", 
    color: "bg-card-pink",
    linkedin: "https://www.linkedin.com/in/priya-nair-12345678/"
  },
  { 
    name: "Shivam Rajput", 
    role: "Sco Expert", 
    badge: "100acress.com", 
    color: "bg-card-green",
    linkedin: "https://www.linkedin.com/in/shivam-rajput-12345678/"
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
