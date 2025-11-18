import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Step2AvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const Step2Availability = ({ onNext, onBack }: Step2AvailabilityProps) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: "Saturday", enabled: true, startTime: "9:00 AM", endTime: "8:00 PM" },
    { day: "Sunday", enabled: true, startTime: "9:00 AM", endTime: "8:00 PM" },
    { day: "Monday", enabled: false, startTime: "", endTime: "" },
    { day: "Tuesday", enabled: false, startTime: "", endTime: "" },
    { day: "Wednesday", enabled: false, startTime: "", endTime: "" },
    { day: "Thursday", enabled: false, startTime: "", endTime: "" },
    { day: "Friday", enabled: false, startTime: "", endTime: "" },
  ]);

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    if (newSchedule[index].enabled && !newSchedule[index].startTime) {
      newSchedule[index].startTime = "9:00 AM";
      newSchedule[index].endTime = "5:00 PM";
    }
    setSchedule(newSchedule);
  };

  const applyToAll = () => {
    const enabledDay = schedule.find((s) => s.enabled);
    if (enabledDay) {
      setSchedule(
        schedule.map((s) => ({
          ...s,
          enabled: true,
          startTime: enabledDay.startTime,
          endTime: enabledDay.endTime,
        }))
      );
    }
  };

  const handleNext = () => {
    // Simulate availability update
    toast.success("Availability updated successfully!");
    onNext();
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-2">Great! Now let's set your availability</h1>
      <p className="text-muted-foreground mb-8">
        Let your audience know when you're available. You can edit this later
      </p>

      <div className="space-y-4 max-w-3xl">
        {schedule.map((daySchedule, index) => (
          <div key={daySchedule.day} className="flex items-center gap-4">
            <Checkbox
              id={daySchedule.day}
              checked={daySchedule.enabled}
              onCheckedChange={() => toggleDay(index)}
              className="data-[state=checked]:bg-primary"
            />
            <label
              htmlFor={daySchedule.day}
              className="w-24 text-sm font-medium cursor-pointer"
            >
              {daySchedule.day}
            </label>

            {daySchedule.enabled ? (
              <>
                <Select
                  value={daySchedule.startTime}
                  onValueChange={(value) => {
                    const newSchedule = [...schedule];
                    newSchedule[index].startTime = value;
                    setSchedule(newSchedule);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-muted-foreground">-</span>

                <Select
                  value={daySchedule.endTime}
                  onValueChange={(value) => {
                    const newSchedule = [...schedule];
                    newSchedule[index].endTime = value;
                    setSchedule(newSchedule);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                    <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Unavailable</span>
            )}
          </div>
        ))}

        <Button
          variant="link"
          onClick={applyToAll}
          className="text-primary hover:text-primary/80"
        >
          Apply To All
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto flex items-center justify-between max-w-3xl">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleNext}
            className="w-full max-w-md bg-foreground text-background hover:bg-foreground/90"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2Availability;