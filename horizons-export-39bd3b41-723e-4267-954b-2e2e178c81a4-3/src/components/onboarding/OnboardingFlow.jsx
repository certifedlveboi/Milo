
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      birthdate: "",
      location: "",
    },
    job: {
      title: "",
      company: "",
      industry: "",
      experience: "",
    },
    interests: [],
  });

  const interests = [
    "Workout", "Work", "Tech", "Rave", "Techno", "Reading",
    "Cooking", "Travel", "Photography", "Gaming", "Music",
    "Art", "Sports", "Fashion", "Movies", "Nature"
  ];

  const handlePersonalInfoChange = (e) => {
    setFormData({
      ...formData,
      personal: {
        ...formData.personal,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleJobDetailsChange = (e) => {
    setFormData({
      ...formData,
      job: {
        ...formData.job,
        [e.target.name]: e.target.value
      }
    });
  };

  const toggleInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          personal_info: formData.personal,
          job_details: formData.job,
          interests: formData.interests
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your preferences have been saved.",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Personal Information</h2>
            <div className="space-y-4">
              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.personal.fullName}
                onChange={handlePersonalInfoChange}
              />
              <Input
                name="birthdate"
                type="date"
                value={formData.personal.birthdate}
                onChange={handlePersonalInfoChange}
              />
              <Input
                name="location"
                placeholder="Location"
                value={formData.personal.location}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Job Details</h2>
            <div className="space-y-4">
              <Input
                name="title"
                placeholder="Job Title"
                value={formData.job.title}
                onChange={handleJobDetailsChange}
              />
              <Input
                name="company"
                placeholder="Company"
                value={formData.job.company}
                onChange={handleJobDetailsChange}
              />
              <Input
                name="industry"
                placeholder="Industry"
                value={formData.job.industry}
                onChange={handleJobDetailsChange}
              />
              <Select
                value={formData.job.experience}
                onValueChange={(value) => 
                  setFormData({
                    ...formData,
                    job: { ...formData.job, experience: value }
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Years of Experience" />
                </SelectTrigger>
                <SelectContent>
                  {["0-2", "3-5", "6-10", "10+"].map((year) => (
                    <SelectItem key={year} value={year}>
                      {year} years
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Select Your Interests</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${formData.interests.includes(interest)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"}
                  `}
                  onClick={() => toggleInterest(interest)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={() => toggleInterest(interest)}
                    />
                    <span>{interest}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Progress value={(step / 3) * 100} className="mb-8" />
      
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleSkip}
        >
          Skip
        </Button>
        
        <div className="space-x-2">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button
            onClick={step === 3 ? handleSubmit : () => setStep(step + 1)}
            disabled={loading}
          >
            {step === 3 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
