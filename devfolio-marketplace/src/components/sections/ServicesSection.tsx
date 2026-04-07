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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary">
            <Zap className="w-3.5 h-3.5 fill-primary" />
            Specialized Neural Services
          </div>
          <h2 className="heading-responsive">
            Strategic <span className="text-primary NOT-italic">Solutions.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
            Book a strategy session or explore specialized digital infrastructure tailored to your mission.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* LEFT SIDE - CALENDAR */}
          <div className="lg:sticky lg:top-32 animate-slide-up">
            <Card className="bg-card border-border/60 shadow-md p-6 md:p-10 relative overflow-hidden group rounded-[32px]">
              <div className="relative z-10 space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform shadow-sm">
                    <Zap className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold tracking-tight text-foreground leading-tight">Book Consultation</h4>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mt-1">
                      Discuss your project roadmap
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/20 rounded-2xl md:rounded-[24px] p-4 md:p-6 border border-border/40">
                  <div className="flex items-center justify-between mb-6 gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrevMonth} className="font-semibold text-xs shrink-0 px-3 bg-background border-border/40 text-foreground hover:bg-secondary/40 active:scale-95 transition-all">
                      Prev
                    </Button>
                    <h3 className="text-sm md:text-base font-bold text-foreground text-center truncate">
                      {monthNames[currentMonth.getMonth()]}{" "}
                      {currentMonth.getFullYear()}
                    </h3>
                    <Button variant="outline" size="sm" onClick={handleNextMonth} className="font-semibold text-xs shrink-0 px-3 bg-background border-border/40 text-foreground hover:bg-secondary/40 active:scale-95 transition-all">
                      Next
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 md:gap-3 mb-6">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="p-1 text-center text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {day}
                      </div>
                    ))}

                    {days.map((dayObj, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleDateClick(idx)}
                        className={`aspect-square flex items-center justify-center text-xs md:text-sm font-semibold cursor-pointer rounded-lg md:rounded-xl transition-all ${dayObj.currentMonth
                          ? selectedDateObj &&
                            selectedDateObj.getDate() === dayObj.day &&
                            selectedDateObj.getMonth() === currentMonth.getMonth()
                            ? "bg-primary text-primary-foreground shadow-md scale-105"
                            : "bg-background text-foreground hover:bg-primary/10 hover:text-primary border border-border/30 hover:border-primary/20 shadow-sm"
                          : "text-muted-foreground/30 pointer-events-none"
                          }`}
                      >
                        {dayObj.day}
                      </div>
                    ))}
                  </div>

                  {/* Footer Stats */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border/20">
                    <div className="text-center md:text-left space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Selected Time</p>
                      <p className="text-sm font-bold text-foreground">
                        {selectedTime || "Select Time"},{" "}
                        {selectedDateObj ? selectedDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select Date"}
                      </p>
                    </div>

                    <Button
                      onClick={handleBookNow}
                      className="w-full md:w-auto h-12 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
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
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
              {services.map((service, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="bg-card border border-border/40 px-5 md:px-8 rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="hover:no-underline py-5 md:py-6">
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-lg md:text-xl font-bold text-primary/40 select-none">
                        {service.number}
                      </span>
                      <span className="text-sm md:text-base font-bold text-foreground">
                        {service.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="space-y-4 pr-4">
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <div className="pt-2">
                        <Button variant="ghost" className="p-0 font-semibold text-xs md:text-sm text-primary hover:bg-transparent hover:text-primary/80 group">
                          Explore Capability <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        <DialogContent className="max-w-md p-6 bg-card border border-border rounded-2xl shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-lg font-bold text-foreground">Select Time</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => handleTimeSelect(time)}
                className={`h-10 md:h-12 rounded-lg md:rounded-xl text-xs font-semibold transition-all ${selectedTime === time ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "hover:bg-secondary/30"
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
