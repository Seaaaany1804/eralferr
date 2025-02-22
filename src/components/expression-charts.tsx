"use client";

import { Card, CardContent } from "@/components/ui/card";
import DonutChart from "@/components/donutchart";

interface Mood {
  icon: string;
  percentage: string;
  label: string;
  bgClass: string;
  color: string;
}

interface ExpressionChartsProps {
  moods: Mood[];
  chartSize?: number;
  strokeWidth?: number;
  className?: string;
}

export function ExpressionCharts({
  moods,
  chartSize = 80,
  strokeWidth = 8,
  className = ""
}: ExpressionChartsProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 ${className}`}>
      {moods.map((mood, index) => (
        <Card key={index} className="shadow-lg">
          <CardContent className={`flex flex-col items-center justify-center p-2 sm:p-4 rounded-[7px] ${mood.bgClass}`}>                    
            <p className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{mood.icon} {mood.label}</p>
            <div className="flex justify-center items-center py-1 sm:py-2">
              <DonutChart
                value={parseFloat(mood.percentage)} 
                color={mood.color}
                size={chartSize}
                strokeWidth={strokeWidth}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 