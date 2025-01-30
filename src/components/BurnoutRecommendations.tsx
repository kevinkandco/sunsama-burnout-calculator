import { Card } from "@/components/ui/card";
import { CheckCircle2Icon } from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
}

interface BurnoutRecommendationsProps {
  workHours: number;
  sleepHours: number;
  selfCareHours: number;
}

const BurnoutRecommendations = ({ workHours, sleepHours, selfCareHours }: BurnoutRecommendationsProps) => {
  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const isHighRisk = workHours > 50 || sleepHours < 6 || selfCareHours < 4;
    const isModerateRisk = workHours > 45 || sleepHours < 7 || selfCareHours < 7;

    // Work-specific recommendations for high/moderate risk
    if (isHighRisk) {
      recommendations.push({
        title: "Urgent: Discuss Workload",
        description: "Schedule a meeting with your manager to discuss workload concerns and potential solutions. Consider requesting temporary support or deadline adjustments.",
      });
      recommendations.push({
        title: "Document Impact",
        description: "Keep a log of how your current workload is affecting your performance and wellbeing. This will help in discussions with management.",
      });
    } else if (isModerateRisk) {
      recommendations.push({
        title: "Proactive Communication",
        description: "Share your capacity concerns with your supervisor during your next 1:1. Consider proposing solutions like task prioritization or process improvements.",
      });
    }

    // Standard recommendations based on specific metrics
    if (workHours > 45) {
      recommendations.push({
        title: "Optimize Work Hours",
        description: "Review your task list and identify what can be delegated or postponed. Focus on high-impact activities during your peak productivity hours.",
      });
    }

    if (sleepHours < 7) {
      recommendations.push({
        title: "Improve Sleep Quality",
        description: "Create a consistent bedtime routine and aim for 7-9 hours of sleep. Consider setting work boundaries to protect your rest time.",
      });
    }

    if (selfCareHours < 7) {
      recommendations.push({
        title: "Prioritize Self-Care",
        description: "Block dedicated time in your calendar for activities that help you recharge. Treat these as important as work meetings.",
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        title: "Maintain Balance",
        description: "You're maintaining good habits! Continue your current routine while staying mindful of any changes in workload or energy levels.",
      });
    }

    return recommendations;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-light text-[#6E59A5] mb-4">Personalized Recommendations</h3>
      <div className="grid gap-4">
        {getRecommendations().map((rec, index) => (
          <Card key={index} className="p-4 border-[#E5DEFF] bg-white/80 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="w-5 h-5 text-[#9b87f5] mt-1" />
              <div>
                <h4 className="font-medium text-[#7E69AB] mb-1">{rec.title}</h4>
                <p className="text-sm text-[#8E9196]">{rec.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BurnoutRecommendations;