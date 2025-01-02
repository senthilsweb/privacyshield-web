"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { AnonymizeForm } from "@/components/anonymize-form";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ProcessedResponse {
  anonymized_text: string;
  faked_text?: string;
  faked_processed_text?: string;
  processed_text: string;
  endpoint?: string;
}

interface EntityStyle {
  bg: string;
  text: string;
}

interface AnonymizeFormRef {
  reset: () => void;
}

const DEFAULT_ENTITY_STYLE: EntityStyle = { bg: 'bg-gray-100', text: 'text-gray-800' };

const entityStyles = new Proxy<Record<string, EntityStyle>>({
  'PERSON': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'PHONE_NUMBER': { bg: 'bg-green-100', text: 'text-green-800' },
  'EMAIL_ADDRESS': { bg: 'bg-purple-100', text: 'text-purple-800' },
  'ADDRESS': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'DATE': { bg: 'bg-pink-100', text: 'text-pink-800' },
  'ORGANIZATION': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
}, {
  get: (target, prop: string): EntityStyle => {
    return target[prop] || DEFAULT_ENTITY_STYLE;
  }
});

const LoadingSection = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-[80%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
);

interface ResponseSectionProps {
  title: string;
  content: string;
  isLoading: boolean;
  show?: boolean;
}

const ResponseSection = ({ 
  title, 
  content,
  isLoading,
  show = true
}: ResponseSectionProps) => {
  if (!show) return null;

  const highlightEntities = (text: string) => {
    const regex = /<([A-Z_]+)>/g;
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        const style = entityStyles[part];
        return (
          <span
            key={i}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mx-1 ${style.bg} ${style.text}`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        {isLoading ? (
          <LoadingSection />
        ) : (
          <div className="whitespace-pre-wrap flex flex-wrap items-center text-black dark:text-black">
            {highlightEntities(content)}
          </div>
        )}
      </div>
    </div>
  );
};

const AnonymizePage = () => {
  const [response, setResponse] = useState<ProcessedResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [originalText, setOriginalText] = useState<string>("");
  const [isAnonymizeOnly, setIsAnonymizeOnly] = useState(false);
  const formRef = useRef<AnonymizeFormRef>(null);
  const { toast } = useToast();


  const handleButtonClick = async (data: any) => {
    // Immediately set loading and clear previous response
    setIsLoading(true);

    setResponse(null);
    setError("");

    const isAnonymizeOnlyOp = data.endpoint === '/detect-pii-entities';
    setIsAnonymizeOnly(isAnonymizeOnlyOp);
  };

  const handleResponse = (data: ProcessedResponse) => {
    setResponse(data);
    const isPIIDetection = data.endpoint === '/detect-pii-entities';
    setIsAnonymizeOnly(isPIIDetection);
    setIsLoading(false);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        duration: 8000,
      });
    }
  };

  const handleReset = () => {
    setResponse(null);
    setError("");
    setIsLoading(false);
    setOriginalText("");
    setIsAnonymizeOnly(false);
    formRef.current?.reset();
  };

  return (
    <>
     
     <div className="flex flex-1 p-6">
  <div className="grid grid-cols-2 gap-6 flex-1">
          {/* Form Section */}
          <div className="h-full">
            <Card className="p-6 h-full flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Text Anonymization</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              <AnonymizeForm 
                ref={formRef}
                onResponse={handleResponse}
                onError={handleError}
                onLoadingChange={handleButtonClick}
                onTextChange={setOriginalText}
              />
            </Card>
          </div>

          {/* Response Section */}
          <div className="h-full">
            <Card className="p-6 h-full flex-1">
              <h2 className="text-xl font-semibold mb-6">Response</h2>
              
              {originalText && (
                <ResponseSection
                  title="Original Text"
                  content={originalText}
                  isLoading={false}
                />
              )}

              {(isLoading || response) && (
                <ResponseSection
                  title={isAnonymizeOnly ? "Detected Entities" : "Anonymized Text"}
                  content={isAnonymizeOnly ? (response?.processed_text || '') : (response?.anonymized_text || '')}
                  isLoading={isLoading}
                />
              )}

              {!isAnonymizeOnly && response && (
                <>
                  <ResponseSection
                    title="Faked Text"
                    content={response?.faked_text || ''}
                    isLoading={isLoading}
                  />

                  <ResponseSection
                    title="Faked Processed Text"
                    content={response?.faked_processed_text || ''}
                    isLoading={isLoading}
                  />

                  <ResponseSection
                    title="Processed Text"
                    content={response?.processed_text || ''}
                    isLoading={isLoading}
                  />
                </>
              )}
            </Card>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default AnonymizePage;