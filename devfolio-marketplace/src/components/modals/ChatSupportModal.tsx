import { useState, useRef, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, User, Bot, Sparkles, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const PREDEFINED_QUESTIONS = [
  { 
    id: "q1", 
    question: "How do I create a service?", 
    answer: "Creating a service is easy! Just go to your [Dashboard](/dashboard/) and click on the 'Create Service' button in the top right. Follow the setup wizard to list your expertise." 
  },
  { 
    id: "q2", 
    question: "What are the commission fees?", 
    answer: "Currently, we are running a 'New Creator Program' with Zero Commission Fees! You keep 100% of what you earn for a limited time." 
  },
  { 
    id: "q3", 
    question: "How do I connect my calendar?", 
    answer: "You can sync your Google or Outlook calendar in the [Settings](/settings/) section under 'Integrations'. This helps automate your booking availability." 
  },
  { 
    id: "q4", 
    question: "When do I get paid?", 
    answer: "Payments are typically processed within 48-72 hours after a session is successfully completed and confirmed by the client." 
  }
];

export function ChatSupportModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "initial", 
      type: 'bot', 
      text: "Hello! I'm your Devfolio Assistant. How can I help you today?", 
      timestamp: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuestionClick = (q: typeof PREDEFINED_QUESTIONS[0]) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: q.question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: q.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const resetChat = () => {
    setMessages([
      { 
        id: "initial", 
        type: 'bot', 
        text: "Hello! I'm your Devfolio Assistant. How can I help you today?", 
        timestamp: new Date() 
      }
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setTimeout(resetChat, 300);
    }}>
      <DialogTrigger asChild>
        <Button className="h-12 rounded-xl px-8 font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-all shadow-sm">
          Start Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 overflow-hidden rounded-[32px] border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="p-6 bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                <Bot className="w-6 h-6 animate-pulse" />
             </div>
             <div>
                <DialogTitle className="text-xl font-bold tracking-tight">AI Assistant</DialogTitle>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   Online & Ready to Help
                </div>
             </div>
          </div>
          <DialogDescription className="sr-only">
             Interactive support chat with predefined questions and answers.
          </DialogDescription>
        </DialogHeader>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex items-start gap-3 animate-fade-in",
                msg.type === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.type === 'user' ? "bg-secondary text-foreground" : "bg-primary/10 text-primary"
              )}>
                {msg.type === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div className={cn(
                "max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                msg.type === 'user' 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-secondary/50 border border-border/40 text-foreground rounded-tl-none"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="bg-secondary/50 border border-border/40 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border/40 bg-secondary/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 px-1">Common Questions</p>
          <div className="grid grid-cols-1 gap-2">
            {PREDEFINED_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                disabled={isTyping}
                className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-left text-xs font-semibold text-foreground group disabled:opacity-50 disabled:pointer-events-none"
              >
                {q.question}
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-background border-t border-border/40 flex items-center gap-2">
           <div className="flex-1 h-10 px-4 flex items-center rounded-lg bg-secondary/30 text-xs font-medium text-muted-foreground italic">
              Powered by Devfolio AI Support
           </div>
           <Button disabled size="icon" className="h-10 w-10 rounded-lg">
              <Send className="w-4 h-4" />
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
