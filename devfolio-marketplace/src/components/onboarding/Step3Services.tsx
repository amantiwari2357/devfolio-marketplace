import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step3ServicesProps {
  onNext: () => void;
  onBack: () => void;
}

const Step3Services: React.FC<Step3ServicesProps> = ({ onNext, onBack }) => {
  const [services, setServices] = useState([
    {
      name: '',
      description: '',
      category: '',
      price: '',
      duration: ''
    }
  ]);

  const addService = () => {
    setServices([...services, {
      name: '',
      description: '',
      category: '',
      price: '',
      duration: ''
    }]);
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving data
    console.log('Services:', services);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Your Services</h1>
        <p className="text-gray-600">What services do you offer to your clients?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Service {index + 1}</h3>
              {services.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeService(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${index}`}>Service Name</Label>
                <Input
                  id={`name-${index}`}
                  value={service.name}
                  onChange={(e) => updateService(index, 'name', e.target.value)}
                  placeholder="e.g., Website Development"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`category-${index}`}>Category</Label>
                <Select onValueChange={(value) => updateService(index, 'category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={service.description}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                placeholder="Describe what this service includes..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`price-${index}`}>Price (₹)</Label>
                <Input
                  id={`price-${index}`}
                  type="number"
                  value={service.price}
                  onChange={(e) => updateService(index, 'price', e.target.value)}
                  placeholder="5000"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`duration-${index}`}>Duration</Label>
                <Select onValueChange={(value) => updateService(index, 'duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="2h">2 hours</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="1d">1 day</SelectItem>
                    <SelectItem value="1w">1 week</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addService} className="w-full">
          + Add Another Service
        </Button>

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

export default Step3Services;
