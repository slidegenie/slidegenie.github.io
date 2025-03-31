import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadSectionProps {
  onFileSelected: (file: File) => void;
}

const UploadSection = ({ onFileSelected }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Check if the file is Excel or CSV
    const fileType = selectedFile.type;
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/csv'
    ];
    
    if (!validTypes.includes(fileType) && 
        !selectedFile.name.endsWith('.csv') && 
        !selectedFile.name.endsWith('.xlsx') &&
        !selectedFile.name.endsWith('.xls')) {
      alert('Please upload a valid Excel or CSV file');
      return;
    }
    
    setFile(selectedFile);
    onFileSelected(selectedFile);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div 
        className={cn(
          "w-full p-8 border-2 border-dashed rounded-lg transition-all duration-300 flex flex-col items-center justify-center min-h-[300px]",
          isDragging ? "border-brand-500 bg-brand-50" : "border-border bg-secondary/30",
          file ? "bg-brand-50/50" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <div className="w-16 h-16 mb-4 rounded-full bg-brand-100 flex items-center justify-center text-brand-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              Drag and drop your data file
            </p>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Upload your Excel spreadsheet or CSV file<br />
              Max file size: 10MB
            </p>
            <Button
              variant="default"
              className="relative z-10 bg-brand-500 hover:bg-brand-600"
              onClick={handleBrowseClick}
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileInput}
            />
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-brand-100 flex items-center justify-center text-brand-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <p className="text-lg font-medium text-foreground mb-1">
              {file.name}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'CSV/Excel file'}
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={removeFile}>
                Remove
              </Button>
              <Button
                variant="default"
                className="bg-brand-500 hover:bg-brand-600"
                onClick={handleBrowseClick}
              >
                Change File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileInput}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="col-span-1 p-4 bg-white rounded-lg border border-border">
          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Accepted Files</p>
          <p className="font-medium">.xlsx, .xls, .csv</p>
        </div>
        <div className="col-span-1 p-4 bg-white rounded-lg border border-border">
          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Size Limit</p>
          <p className="font-medium">10MB maximum</p>
        </div>
        <div className="col-span-1 p-4 bg-white rounded-lg border border-border">
          <p className="text-xs text-muted-foreground uppercase font-medium mb-1">Data Rows</p>
          <p className="font-medium">Up to 10,000 rows</p>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
