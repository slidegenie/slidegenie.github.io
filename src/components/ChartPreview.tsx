
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import type { ChartType } from "./ChartTypeSelector";

interface ChartPreviewProps {
  chartType: ChartType;
  onDownload: () => void;
}

const ChartPreview = ({ chartType, onDownload }: ChartPreviewProps) => {
  // Sample data for preview
  const data = [
    { name: 'Jan', value: 400, value2: 240 },
    { name: 'Feb', value: 300, value2: 139 },
    { name: 'Mar', value: 200, value2: 980 },
    { name: 'Apr', value: 278, value2: 390 },
    { name: 'May', value: 189, value2: 480 },
    { name: 'Jun', value: 239, value2: 380 },
    { name: 'Jul', value: 349, value2: 430 },
  ];

  const pieData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
    { name: 'Jul', value: 349 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0e90ea" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#0e90ea" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#0e90ea" fill="#0e90ea" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="value" name="value" />
              <YAxis type="number" dataKey="value2" name="value2" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Values" data={data} fill="#0e90ea" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      case 'combo':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0e90ea" />
              <Line type="monotone" dataKey="value2" stroke="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <div className="flex items-center justify-center h-80">
            <p className="text-lg text-muted-foreground">Please select a chart type</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-lg border border-border overflow-hidden">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-1">Chart Preview</h2>
          <p className="text-muted-foreground">
            This is how your chart will appear in PowerPoint
          </p>
        </div>
        
        {renderChart()}
        
        <div className="mt-8 flex justify-end">
          <Button 
            variant="default" 
            className="bg-brand-500 hover:bg-brand-600"
            onClick={onDownload}
          >
            Export to PowerPoint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChartPreview;
