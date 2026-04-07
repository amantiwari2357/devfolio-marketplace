import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Zap, ArrowRight, Activity, Calendar as CalendarIcon } from "lucide-react";
import api from "@/services/api";

const services = [
  {
    number: "01",
    title: "Custom Website Development",
    description:
      "From portfolio sites to dynamic business platforms — I design and develop fast, responsive, and SEO-friendly websites that help your brand stand out.",
  },
  {
    number: "02",
    title: "Full Stack Application Development",
    description:
      "I build modern web applications using the latest technologies like React, Node.js, and MongoDB — ensuring performance, scalability, and security.",
  },
  {
    number: "03",
    title: "UI/UX Design & Prototyping",
    description:
      "Crafting intuitive and user-centered designs that enhance engagement and bring your product vision to life.",
  },
  {
    number: "04",
    title: "Maintenance & Optimization",
    description:
      "Keep your website updated, secure, and performing at its best. I handle regular maintenance, bug fixes, and speed optimization.",
  },
  {
    number: "05",
    title: "Branding & Digital Presence",
    description:
      "From domain setup to SEO and analytics — I help you build a strong digital presence that converts visitors into clients.",
  },
];

const ServicesSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleDateClick = (index: number) => {
    const dayObj = days[index];
    if (dayObj.currentMonth) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        dayObj.day
      );
      setSelectedDateObj(date);
      setIsTimePopupOpen(true);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsTimePopupOpen(false);
  };

  const handleBookNow = async () => {
    if (!selectedDateObj || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    const bookingData = {
      date: selectedDateObj.toISOString(),
      time: selectedTime,
      userName: "amantiwari2357",
      userEmail: "devfoliomarketplace@gmail.com",
      userPhone: "9031359720",
      serviceType: "Consultation",
      notes: "Booked via Services Section",
    };

    try {
      const result = await api.post("/availabilities", bookingData);

      if (result.data.success) {
        toast.success("Strategic connection established!");
        setSelectedDateObj(null);
        setSelectedTime(null);
      } else {
        toast.error("Link failure: " + result.data.message);
      }
    } catch (error) {
      console.error("Error booking:", error);
      toast.error("Protocol error. Please retry synchronization.");
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
  ];

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/2 opacity-30 blur-[150px] rounded-full animate-pulse" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-14 space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
            <Zap className="w-4 h-4 animate-pulse" />
            Specialized Neural Services
          </div>
          <h2 className="heading-responsive">
            Strategic <span className="text-primary NOT-italic">Solutions.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-70">
            Book a strategy session or explore specialized digital infrastructure tailored to your mission.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* LEFT SIDE - CALENDAR */}
          <div className="lg:sticky lg:top-32 animate-slide-up">
            <Card className="neural-card p-10 md:p-12 relative overflow-hidden group shadow-2xl">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[22px] bg-secondary/50 flex items-center justify-center text-primary shadow-inner group-hover:rotate-6 transition-all">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-black tracking-tighter text-foreground italic uppercase leading-none">Book Consultation.</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-2 opacity-50 italic">
                      Discuss your project roadmap
                    </p>
                  </div>
                </div>

                <div className="bg-background/50 backdrop-blur-xl rounded-[32px] p-4 border border-border/20 shadow-inner">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" size="sm" onClick={handlePrevMonth} className="font-black hover:bg-secondary/20">
                      PREV
                    </Button>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary italic">
                      {monthNames[currentMonth.getMonth()]}{" "}
                      {currentMonth.getFullYear()}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={handleNextMonth} className="font-black hover:bg-secondary/20">
                      NEXT
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3 mb-8">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                      <div key={day} className="p-1 text-center text-[9px] font-black tracking-widest text-muted-foreground/40 italic">
                        {day}
                      </div>
                    ))}

                    {days.map((dayObj, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDateClick(idx)}
                        className={`aspect-square flex items-center justify-center text-[11px] font-black cursor-pointer rounded-xl transition-all ${dayObj.currentMonth
                          ? selectedDateObj &&
                            selectedDateObj.getDate() === dayObj.day &&
                            selectedDateObj.getMonth() === currentMonth.getMonth()
                            ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30 scale-110"
                            : "bg-secondary/40 text-foreground hover:bg-primary/20 hover:text-primary"
                          : "text-muted-foreground/20 pointer-events-none"
                          }`}
                      >
                        {dayObj.day}
                      </div>
                    ))}
                  </div>

                  {/* Footer Stats */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/20">
                    <div className="text-center md:text-left space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Selected Node</p>
                      <p className="text-sm font-black text-foreground italic uppercase tracking-tight">
                        {selectedTime || "SELECT_TIME"}, {" "}
                        {selectedDateObj ? selectedDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "SELECT_DATE"}
                      </p>
                    </div>

                    <Button
                      onClick={handleBookNow}
                      className="h-14 px-10 rounded-[20px] font-black bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] italic border-none"
                    >
                      Authorize Connection
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE - SERVICES ACCORDION */}
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
              {services.map((service, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="neural-card border-none px-4 md:px-6 rounded-[32px] overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-4 md:py-5">
                    <div className="flex items-center gap-6 text-left">
                      <span className="text-lg md:text-xl font-black text-primary NOT-italic opacity-30 select-none">
                        {service.number}
                      </span>
                      <span className="text-sm md:text-base font-black tracking-tighter text-foreground italic uppercase">
                        {service.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 px-0">
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-muted-foreground/80 leading-relaxed italic tracking-tight">
                        {service.description}
                      </p>
                      <div className="pt-2">
                        <Button variant="ghost" className="p-0 font-black text-[10px] tracking-[0.4em] uppercase text-primary italic hover:bg-transparent group">
                          Explore Capability <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Time Popup */}
      <Dialog open={isTimePopupOpen} onOpenChange={setIsTimePopupOpen}>
        <DialogContent className="max-w-md p-8 bg-background/95 backdrop-blur-2xl border-border/40 rounded-[32px] shadow-2xl">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-lg font-black tracking-tighter text-foreground italic uppercase">Select Node <span className="text-primary NOT-italic">Time.</span></DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => handleTimeSelect(time)}
                className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest italic border-border/20 transition-all ${selectedTime === time ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-secondary/20"
                  }`}
              >
                {time}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
