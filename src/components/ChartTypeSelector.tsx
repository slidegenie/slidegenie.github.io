
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'combo';

interface ChartTypeSelectorProps {
  onChartTypeSelected: (chartType: ChartType) => void;
  selectedType?: ChartType;
}

interface ChartOption {
  type: ChartType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const ChartTypeSelector = ({ onChartTypeSelected, selectedType }: ChartTypeSelectorProps) => {
  const chartOptions: ChartOption[] = [
    {
      type: 'bar',
      name: 'Bar Chart',
      description: 'Compare values across categories',
      icon: (
        <svg className="w-10 h-10 text-brand-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="10" y="8" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="17" y="4" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 20L21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      type: 'line',
      name: 'Line Chart',
      description: 'Show trends over time or categories',
      icon: (
        <svg className="w-10 h-10 text-brand-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 20L6.5 12L12 14L17.5 6L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 20L21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      type: 'pie',
      name: 'Pie Chart',
      description: 'Show proportion of a whole',
      icon: (
        <svg className="w-10 h-10 text-brand-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.5778 21.7031 9.22332 21.1679 8.00002L12 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M20 6L12 12L12 4C14.5013 4 16.7793 4.77303 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      type: 'area',
      name: 'Area Chart',
      description: 'Highlight magnitude of change',
      icon: (
        <svg className="w-10 h-10 text-brand-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 20L6.5 12L12 14L17.5 6L21 10V20H3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M3 20L21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      type: 'scatter',
      name: 'Scatter Plot',
      description: 'Show correlation between variables',
      icon: (
        <svg className="w-10 h-10 text-brand-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="15" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="19" cy="13" r="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 20L21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 4L3 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      type: 'combo',
      name: 'Combo Chart',
      description: 'Combine multiple chart types',
      icon: (
        <svg className="w-10 h-10 text-brand-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="10" y="8" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 20L21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17 20L17 4L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  const handleSelectChart = (chartType: ChartType) => {
    onChartTypeSelected(chartType);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartOptions.map((option) => (
          <div
            key={option.type}
            className={cn(
              "chart-option p-6 rounded-lg border bg-card cursor-pointer transition-all",
              selectedType === option.type ? "selected border-brand-500 bg-brand-50/50" : "hover:border-brand-200"
            )}
            onClick={() => handleSelectChart(option.type)}
          >
            <div className="flex items-start mb-4">
              {option.icon}
              {selectedType === option.type && (
                <div className="ml-auto bg-brand-500 text-white rounded-full p-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            <h3 className="text-lg font-medium text-foreground">{option.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartTypeSelector;
