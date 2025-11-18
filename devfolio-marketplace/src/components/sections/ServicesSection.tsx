import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

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
  const [selectedDate, setSelectedDate] = useState(1); // Default to Sat 16 Oct
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isTimePopupOpen, setIsTimePopupOpen] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const handleDateClick = (index: number) => {
    const dayObj = days[index];
    if (dayObj.currentMonth) {
      const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayObj.day);
      setSelectedDateObj(selectedDate);
      setIsTimePopupOpen(true);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsTimePopupOpen(false);
  };

  const handleBookNow = async () => {
    if (!selectedDateObj || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    // For demo purposes, using placeholder user data
    // In a real app, this would come from user authentication
    const bookingData = {
      date: selectedDateObj.toISOString(),
      time: selectedTime,
      userName: 'Demo User', // Replace with actual user data
      userEmail: 'demo@example.com', // Replace with actual user data
      userPhone: '+1234567890', // Replace with actual user data
      serviceType: 'Consultation',
      notes: 'Booked via Services Section'
    };

    try {
      const response = await fetch('http://localhost:5000/api/availabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Booking successful!');
        // Reset selection
        setSelectedDate(1);
        setSelectedDateObj(null);
        setSelectedTime(null);
      } else {
        alert('Booking failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error booking:', error);
      alert('Error booking consultation. Please try again.');
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
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Booking Card */}
          <div className="lg:sticky lg:top-32">
            <Card className="bg-card-pink border-none p-8 rounded-3xl shadow-md">
              <div className="bg-card p-6 rounded-2xl mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-card-pink" />
                  <div>
                    <p className="font-semibold text-sm">Book a Consultation</p>
                    <p className="text-xs text-muted-foreground">
                      Discuss your project idea
                    </p>
                  </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                    ‹
                  </Button>
                  <h3 className="text-sm font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                    ›
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-1 text-center text-xs font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {days.map((dayObj, idx) => (
                    <div
                      key={idx}
                      className={`p-2 text-center text-xs cursor-pointer rounded-lg ${
                        dayObj.currentMonth
                          ? selectedDateObj && selectedDateObj.getDate() === dayObj.day && selectedDateObj.getMonth() === currentMonth.getMonth()
                            ? "bg-foreground text-background"
                            : "bg-muted hover:bg-muted/80"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => handleDateClick(idx)}
                    >
                      {dayObj.day}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Next available</span>
                    <br />
                    <span className="font-semibold">
                      {selectedTime || "07:00pm"}, {selectedDateObj ? selectedDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Tue 21st"}
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

              {/* Time Selection Dialog */}
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


          {/* Right Side - Services Accordion */}
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
