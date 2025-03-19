
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, X, Image as ImageIcon } from "lucide-react";
import { AnimatedGradientButton } from "./AnimatedGradientButton";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  className?: string;
}

export function UploadZone({
  onFileSelected,
  acceptedFileTypes = "image/*",
  maxSizeMB = 10,
  className,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      alert(`File size exceeds the ${maxSizeMB}MB limit.`);
      return false;
    }
    
    // Check file type if acceptedFileTypes is specified
    if (acceptedFileTypes && !file.type.match(acceptedFileTypes.replace(/\*/g, '.*'))) {
      alert(`Invalid file type. Please upload ${acceptedFileTypes}.`);
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelected(file);
      
      // Create preview if it's an image
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn("w-full", className)}>
      {!selectedFile ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-xl transition-all duration-200 animate-fade-in",
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-muted hover:border-primary/50 hover:bg-muted/30",
            className
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">Drag & Drop your file</h3>
            <p className="text-muted-foreground mb-3 max-w-sm">
              Drop your file here, or click to browse your device
            </p>
            
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept={acceptedFileTypes}
              onChange={handleChange}
            />
            
            <AnimatedGradientButton 
              onClick={() => inputRef.current?.click()}
              className="text-sm font-medium"
            >
              Browse Files
            </AnimatedGradientButton>
            
            <p className="text-xs text-muted-foreground mt-3">
              Maximum file size: {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in relative glass-card rounded-xl p-6 transition-all">
          <button 
            onClick={clearSelection}
            className="absolute right-3 top-3 rounded-full p-1 bg-background/80 backdrop-blur-sm hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col gap-4">
            {preview ? (
              <div className="w-full overflow-hidden rounded-lg border">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-auto object-contain max-h-48"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-32 bg-muted/30 rounded-lg">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            
            <div className="flex flex-col">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
