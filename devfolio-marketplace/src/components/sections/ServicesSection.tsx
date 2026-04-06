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
import { Zap } from "lucide-react";
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
      userEmail: "amankumartiwari5255@gmail.com",
      userPhone: "9031359720",
      serviceType: "Consultation",
      notes: "Booked via Services Section",
    };

    try {
      const result = await api.post("/availabilities", bookingData);

      if (result.data.success) {
        toast.success("Booking successful!");
        setSelectedDateObj(null);
        setSelectedTime(null);
      } else {
        toast.error("Booking failed: " + result.data.message);
      }
    } catch (error) {
      console.error("Error booking:", error);
      toast.error("Error booking consultation. Please try again.");
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            My <span className="text-primary">Services</span> & Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a strategy session or explore specialized digital services tailored to your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-32">
            <Card className="bg-secondary/40 border-border/50 p-8 rounded-[2rem] shadow-sm">
              <div className="bg-card p-8 rounded-3xl mb-6 shadow-sm border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Book a Consultation</h4>
                    <p className="text-xs text-muted-foreground font-medium">
                      Discuss your project idea & requirements
                    </p>
                  </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                    ‹
                  </Button>
                  <h3 className="text-sm font-semibold">
                    {monthNames[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                    ›
                  </Button>
                </div>

                {/* Calendar */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-1 text-center text-xs font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    )
                  )}

                  {days.map((dayObj, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleDateClick(idx)}
                      className={`p-2 text-center text-xs cursor-pointer rounded-lg ${
                        dayObj.currentMonth
                          ? selectedDateObj &&
                            selectedDateObj.getDate() === dayObj.day &&
                            selectedDateObj.getMonth() ===
                              currentMonth.getMonth()
                            ? "bg-foreground text-background"
                            : "bg-muted hover:bg-muted/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {dayObj.day}
                    </div>
                  ))}
                </div>

                {/* Selected Info */}
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Next available</span>
                    <br />
                    <span className="font-semibold">
                      {selectedTime || "Select Time"},{" "}
                      {selectedDateObj
                        ? selectedDateObj.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "Select Date"}
                    </span>
                  </p>

                  <button
                    className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Time Popup */}
              <Dialog open={isTimePopupOpen} onOpenChange={setIsTimePopupOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Select Time</DialogTitle>
                  </DialogHeader>

                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-4"
            >
              {services.map((service, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-border pb-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <span className="text-primary font-semibold">
                        {service.number}
                      </span>
                      <span className="text-xl font-semibold">
                        {service.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 text-muted-foreground">
                    {service.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
