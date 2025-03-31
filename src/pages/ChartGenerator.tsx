import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StepIndicator from "@/components/StepIndicator";
import UploadSection from "@/components/UploadSection";
import ChartTypeSelector, { ChartType } from "@/components/ChartTypeSelector";
import ChartPreview from "@/components/ChartPreview";
import { PlusCircle, FileText, BarChart3, Eye, Loader2 } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps = ["Upload Data", "Select Chart Type", "Preview & Export"];
const stepIcons = [<FileText className="h-5 w-5" />, <BarChart3 className="h-5 w-5" />, <Eye className="h-5 w-5" />];

type ChartConfig = {
  id: string;
  type: ChartType;
  title: string;
};

// --- 1. Define your Render API URL ---
const CHART_API_URL = "https://chart-generator-api.onrender.com";

const ChartGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<ChartType | undefined>(undefined);
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [activeChartId, setActiveChartId] = useState<string | null>(null);
  // --- 2. Add loading state ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // Optional: store download link if needed later

  const handleFileSelected = (file: File) => {
    setDataFile(file);
  };

  const handleChartTypeSelected = (chartType: ChartType) => {
    setSelectedChartType(chartType);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedChartType) {
      toast.error("Please select a chart type");
      return;
    }
    
    if (currentStep === 1 && selectedChartType) {
      const newChart: ChartConfig = {
        id: Date.now().toString(),
        type: selectedChartType,
        title: `${selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)} Chart ${charts.length + 1}`
      };
      
      setCharts(prev => [...prev, newChart]);
      setActiveChartId(newChart.id);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCreateAnotherChart = () => {
    setCurrentStep(1);
    setSelectedChartType(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChart = (chartId: string) => {
    setActiveChartId(chartId);
    const chart = charts.find(c => c.id === chartId);
    if (chart) {
      setSelectedChartType(chart.type);
    }
    setDownloadLink(null); // Reset download link when switching charts
  };

  // --- 3. Modify handleExport to call the API ---
  const handleExport = async () => {
    if (!dataFile || !activeChartId) {
      toast.error("Please ensure data is uploaded and a chart is selected.");
      return;
    }

    const activeChart = charts.find(c => c.id === activeChartId);
    if (!activeChart) {
      toast.error("Could not find the selected chart configuration.");
      return;
    }

    setIsGenerating(true); // Start loading
    setDownloadLink(null); // Reset previous link
    toast.info("Generating your PowerPoint file...", { duration: 5000 }); // Give user feedback

    try {
      const formData = new FormData();
      formData.append("dataFile", dataFile);
      formData.append("chartType", activeChart.type);
      // You can add slidePosition if you capture it in the UI, otherwise backend defaults to 1
      // formData.append("slidePosition", "1"); // Example if needed

      // Optional: Add template file if you implement template upload
      // if (templateFile) {
      //   formData.append("templateFile", templateFile);
      // }

      const response = await fetch(`${CHART_API_URL}/generate-chart`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.statusText}`);
      }

      const result = await response.json();
      const fullDownloadUrl = `${CHART_API_URL}${result.downloadUrl}`;
      setDownloadLink(fullDownloadUrl); // Store the link

      // Trigger download immediately
      window.open(fullDownloadUrl, "_blank");

      toast.success("Chart successfully generated and download started!");

      // You could potentially use result.previewUrl here if the backend generated a real preview
      // setPreview(result.previewUrl);

    } catch (error) {
      console.error("Export failed:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred during export.");
    } finally {
      setIsGenerating(false); // Stop loading
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <UploadSection onFileSelected={handleFileSelected} />;
      case 1:
        return <ChartTypeSelector 
                 onChartTypeSelected={handleChartTypeSelected} 
                 selectedType={selectedChartType} 
               />;
      case 2:
        const activeChart = charts.find(c => c.id === activeChartId);
        return (
          <div className="space-y-8">
            {charts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Your Charts</h3>
                <div className="flex flex-wrap gap-3">
                  {charts.map(chart => (
                    <TooltipProvider key={chart.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={activeChartId === chart.id ? "default" : "outline"}
                            className={`${activeChartId === chart.id ? "bg-brand-500 hover:bg-brand-600" : ""} transition-all duration-200`}
                            onClick={() => handleSelectChart(chart.id)}
                          >
                            {chart.title}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to view this chart</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 transition-all duration-200 hover:border-brand-300" 
                        onClick={handleCreateAnotherChart}
                      >
                        <PlusCircle size={16} />
                        Create Another Chart
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Add a new chart</h4>
                          <p className="text-sm text-muted-foreground">
                            Create another chart from the same data file
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            )}
            
            {activeChart && (
              <Card className="border border-border/60 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{activeChart.title}</CardTitle>
                  <CardDescription>Preview your chart before exporting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPreview
                    chartType={activeChart.type}
                    onDownload={handleExport}
                    isGenerating={isGenerating}
                    downloadLink={downloadLink}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <h1 className="text-4xl font-display font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400 animate-fade-in">
              Create Your Chart
            </h1>
            <StepIndicator 
              steps={steps} 
              currentStep={currentStep} 
              onStepClick={handleStepClick} 
              icons={stepIcons}
            />
          </div>
          
          <Card className="mb-10 border-border/30 overflow-hidden shadow-xl glass-card animate-slide-up">
            <CardContent className="p-10 pt-10">
              {renderStepContent()}
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0 || isGenerating}
              className="transition-all duration-200 hover:border-brand-300 shadow-sm"
            >
              Previous Step
            </Button>
            
            {currentStep < steps.length - 1 && (
              <Button
                variant="default"
                className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 transition-all duration-200 shadow-md"
                onClick={handleNextStep}
                disabled={isGenerating || (currentStep === 0 && !dataFile)}
              >
                Next Step
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChartGenerator;
