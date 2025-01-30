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

    if (workHours > 50) {
      recommendations.push({
        title: "Reduce Work Hours",
        description: "Consider delegating tasks or discussing workload with your supervisor. Long hours significantly increase burnout risk.",
      });
    }

    if (sleepHours < 7) {
      recommendations.push({
        title: "Improve Sleep Habits",
        description: "Aim for 7-9 hours of sleep. Create a bedtime routine and maintain consistent sleep schedule.",
      });
    }

    if (selfCareHours < 7) {
      recommendations.push({
        title: "Increase Self-Care",
        description: "Schedule regular breaks and dedicate time for activities you enjoy. Even small self-care moments matter.",
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        title: "Maintain Current Balance",
        description: "You're maintaining good habits! Continue your current routine while staying mindful of any changes.",
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