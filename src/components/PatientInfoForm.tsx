
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FadeIn } from './transitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type PatientInfo = {
  name: string;
  age: string;
  gender: string;
  date: Date;
  id: string;
};

type PatientInfoFormProps = {
  patientInfo: PatientInfo;
  setPatientInfo: React.Dispatch<React.SetStateAction<PatientInfo>>;
  onComplete: () => void;
};

const PatientInfoForm = ({ patientInfo, setPatientInfo, onComplete }: PatientInfoFormProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof PatientInfo, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof PatientInfo]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof PatientInfo];
        return newErrors;
      });
    }
  };

  const handleGenderChange = (value: string) => {
    setPatientInfo(prev => ({ ...prev, gender: value }));
    if (errors.gender) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.gender;
        return newErrors;
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setPatientInfo(prev => ({ ...prev, date }));
      if (errors.date) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.date;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<Record<keyof PatientInfo, string>> = {};
    
    if (!patientInfo.name.trim()) {
      newErrors.name = 'Patient name is required';
    }
    
    if (!patientInfo.id.trim()) {
      newErrors.id = 'Patient ID is required';
    }
    
    if (!patientInfo.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!patientInfo.date) {
      newErrors.date = 'Examination date is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onComplete();
  };

  return (
    <FadeIn>
      <div className="glass-panel p-6 md:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-clinical-800">Patient Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={patientInfo.name}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200",
                    errors.name && "border-destructive focus:ring-destructive"
                  )}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id" className="text-clinical-800">Patient ID</Label>
                <Input
                  id="id"
                  name="id"
                  placeholder="Patient Identifier"
                  value={patientInfo.id}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200",
                    errors.id && "border-destructive focus:ring-destructive"
                  )}
                />
                {errors.id && (
                  <p className="text-destructive text-sm mt-1">{errors.id}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-clinical-800">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="text"
                  placeholder="Patient age"
                  value={patientInfo.age}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-clinical-800">Gender</Label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={patientInfo.gender === 'Male' ? 'default' : 'outline'}
                    onClick={() => handleGenderChange('Male')}
                    className="flex-1"
                  >
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant={patientInfo.gender === 'Female' ? 'default' : 'outline'}
                    onClick={() => handleGenderChange('Female')}
                    className="flex-1"
                  >
                    Female
                  </Button>
                  <Button
                    type="button"
                    variant={patientInfo.gender === 'Other' ? 'default' : 'outline'}
                    onClick={() => handleGenderChange('Other')}
                    className="flex-1"
                  >
                    Other
                  </Button>
                </div>
                {errors.gender && (
                  <p className="text-destructive text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="text-clinical-800">Examination Date</Label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !patientInfo.date && "text-muted-foreground",
                          errors.date && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {patientInfo.date ? (
                          format(patientInfo.date, 'PPP')
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={patientInfo.date}
                        onSelect={handleDateChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-destructive text-sm mt-1">{errors.date}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="px-6 transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              Continue to Examination
            </Button>
          </div>
        </form>
      </div>
    </FadeIn>
  );
};

export default PatientInfoForm;
