import { Card } from "@/components/ui/card";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

interface BurnoutVisualsProps {
  score: number;
  workHours: number;
  sleepHours: number;
  selfCareHours: number;
}

const BurnoutVisuals = ({ score, workHours, sleepHours, selfCareHours }: BurnoutVisualsProps) => {
  const normalizedWorkHours = Math.min((workHours / 40) * 100, 100);
  const normalizedSleepHours = (sleepHours / 9) * 100;
  const normalizedSelfCare = (selfCareHours / 10) * 100;

  const data = [
    {
      name: "Risk Score",
      value: score * 10,
      fill: score <= 3 ? "#68D391" : score <= 6 ? "#F6AD55" : "#FC8181",
    },
  ];

  const metrics = [
    { label: "Work Load", value: normalizedWorkHours, color: "#9b87f5" },
    { label: "Sleep Quality", value: normalizedSleepHours, color: "#7E69AB" },
    { label: "Self-Care", value: normalizedSelfCare, color: "#6E59A5" },
  ];

  return (
    <Card className="p-6 border-[#E5DEFF] bg-white/80 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64">
          <h4 className="text-center text-sm font-medium text-[#7E69AB] mb-4">Risk Score</h4>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="100%"
              barSize={10}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={30}
                fill="#9b87f5"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#7E69AB] text-2xl font-light"
              >
                {score.toFixed(1)}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-[#7E69AB] mb-4">Key Metrics</h4>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8E9196]">{metric.label}</span>
                <span className="text-[#7E69AB]">{Math.round(metric.value)}%</span>
              </div>
              <div className="h-2 bg-[#F1F0FB] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${metric.value}%`,
                    backgroundColor: metric.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BurnoutVisuals;