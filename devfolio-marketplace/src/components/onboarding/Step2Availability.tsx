import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Step2AvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

const Step2Availability: React.FC<Step2AvailabilityProps> = ({ onNext, onBack }) => {
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const [timeSlots, setTimeSlots] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });

  const handleDayChange = (day: string, checked: boolean) => {
    setAvailability(prev => ({ ...prev, [day]: checked }));
  };

  const handleTimeSlotChange = (slot: string, checked: boolean) => {
    setTimeSlots(prev => ({ ...prev, [slot]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving data
    console.log('Availability:', { availability, timeSlots });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Set Your Availability</h1>
        <p className="text-gray-600">When are you available for consultations?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label className="text-lg font-semibold mb-4 block">Available Days</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(availability).map(([day, checked]) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={checked}
                  onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                />
                <Label htmlFor={day} className="capitalize">
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold mb-4 block">Preferred Time Slots</Label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="morning"
                checked={timeSlots.morning}
                onCheckedChange={(checked) => handleTimeSlotChange('morning', checked as boolean)}
              />
              <Label htmlFor="morning">Morning (9 AM - 12 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="afternoon"
                checked={timeSlots.afternoon}
                onCheckedChange={(checked) => handleTimeSlotChange('afternoon', checked as boolean)}
              />
              <Label htmlFor="afternoon">Afternoon (12 PM - 5 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="evening"
                checked={timeSlots.evening}
                onCheckedChange={(checked) => handleTimeSlotChange('evening', checked as boolean)}
              />
              <Label htmlFor="evening">Evening (5 PM - 9 PM)</Label>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step2Availability;
