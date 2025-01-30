import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, Share2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface BurnoutInputs {
  hoursWorked: number;
  sleepHours: number;
  selfCareHours: number;
}

const BurnoutCalculator = () => {
  const [inputs, setInputs] = useState<BurnoutInputs>({
    hoursWorked: 40,
    sleepHours: 7,
    selfCareHours: 5,
  });
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const calculateRiskScore = () => {
    const workLoad = inputs.hoursWorked / 40; // normalized to standard work week
    const sleepDeficit = (8 - inputs.sleepHours) / 8; // normalized to recommended sleep
    const selfCareDeficit = (10 - inputs.selfCareHours) / 10; // normalized to recommended self-care

    const score = (workLoad * 4 + sleepDeficit * 3 + selfCareDeficit * 3) / 10;
    return Math.min(Math.max(score, 0), 1) * 10; // Scale to 0-10
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: "Low", color: "text-sage-500" };
    if (score <= 6) return { level: "Moderate", color: "text-orange-500" };
    return { level: "High", color: "text-red-500" };
  };

  const getBurnoutWindow = (score: number) => {
    if (score <= 3) return "Low risk - maintain current balance";
    if (score <= 6) return "4-8 weeks if patterns continue";
    return "2-4 weeks if patterns continue";
  };

  const handleShare = () => {
    const score = calculateRiskScore();
    const { level } = getRiskLevel(score);
    const text = `I just checked my burnout risk level using the Burnout Calculator. My risk level is ${level}. Check yours too!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Burnout Risk Assessment',
        text: text,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(text).then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Share link has been copied to your clipboard",
          });
        });
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Share link has been copied to your clipboard",
        });
      });
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setInputs({
      hoursWorked: 40,
      sleepHours: 7,
      selfCareHours: 5,
    });
    setShowResults(false);
  };

  const score = calculateRiskScore();
  const riskLevel = getRiskLevel(score);
  const burnoutWindow = getBurnoutWindow(score);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light text-sage-900">Burnout Risk Calculator</h1>
          <p className="text-sage-600 max-w-md mx-auto">
            Assess your risk of burnout based on your work habits and self-care practices
          </p>
        </div>

        <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-sage-700 flex items-center gap-2">
                  Hours Worked per Week
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-sage-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Standard work week is 40 hours</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <span className="text-sm text-sage-500">{inputs.hoursWorked}h</span>
              </div>
              <Slider
                value={[inputs.hoursWorked]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setInputs({ ...inputs, hoursWorked: value[0] })}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-sage-700 flex items-center gap-2">
                  Average Sleep per Night
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-sage-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Recommended sleep is 7-9 hours</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <span className="text-sm text-sage-500">{inputs.sleepHours}h</span>
              </div>
              <Slider
                value={[inputs.sleepHours]}
                min={0}
                max={12}
                step={0.5}
                onValueChange={(value) => setInputs({ ...inputs, sleepHours: value[0] })}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-sage-700 flex items-center gap-2">
                  Self-Care Hours per Week
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon className="h-4 w-4 text-sage-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Time spent on activities that help you relax and recharge</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <span className="text-sm text-sage-500">{inputs.selfCareHours}h</span>
              </div>
              <Slider
                value={[inputs.selfCareHours]}
                min={0}
                max={40}
                step={0.5}
                onValueChange={(value) => setInputs({ ...inputs, selfCareHours: value[0] })}
                className="w-full"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleCalculate}
                className="w-full bg-sage-500 hover:bg-sage-600 text-white"
              >
                Calculate Risk
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-4 text-sage-600 border-sage-200 hover:bg-sage-50"
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-light text-sage-900 mb-2">Your Results</h2>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-medium text-sage-700">{score.toFixed(1)}</span>
                    <span className={`text-2xl font-light ${riskLevel.color}`}>
                      {riskLevel.level} Risk
                    </span>
                  </div>
                  <p className="text-sage-600 mt-4">{burnoutWindow}</p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full border-sage-200 text-sage-700 hover:bg-sage-50"
                  >
                    <Share2Icon className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>

                  <a
                    href="https://sunsama.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
                      Try Sunsama Free
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-center text-sage-400">
                  Your data is not stored or shared. This assessment is for informational purposes only.
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BurnoutCalculator;