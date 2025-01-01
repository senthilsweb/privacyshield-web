"use client";

import React, { useRef } from "react";
import { useState } from "react"
import { AnonymizeForm } from "@/components/anonymize-form"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface ProcessedResponse {
  anonymized_text: string
  faked_text?: string
  faked_processed_text?: string
  processed_text: string
  endpoint?: string
}

// Default colors for entity highlighting
const DEFAULT_ENTITY_STYLE = { bg: 'bg-gray-100', text: 'text-gray-800' };

const entityStyles = new Proxy({
  'PERSON': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'PHONE_NUMBER': { bg: 'bg-green-100', text: 'text-green-800' },
  'EMAIL_ADDRESS': { bg: 'bg-purple-100', text: 'text-purple-800' },
  'ADDRESS': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'DATE': { bg: 'bg-pink-100', text: 'text-pink-800' },
  'ORGANIZATION': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
}, {
  get: (target, prop) => target[prop] || DEFAULT_ENTITY_STYLE
});

const LoadingSection = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-[80%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
);

const ResponseSection = ({ 
  title, 
  content,
  isLoading,
  show = true
}: { 
  title: string
  content: string
  isLoading: boolean
  show?: boolean
}) => {
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
          <div className="whitespace-pre-wrap flex flex-wrap items-center">
            {highlightEntities(content)}
          </div>
        )}
      </div>
    </div>
  );
};

const AnonymizePage = () => {
  const [response, setResponse] = useState<ProcessedResponse | null>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [originalText, setOriginalText] = useState<string>("")
  const [isAnonymizeOnly, setIsAnonymizeOnly] = useState(false)
  const formRef = useRef<any>(null)
  const { toast } = useToast()

const handleButtonClick = async (data: any) => {
  // Immediately set loading and clear previous response
  setIsLoading(true);
  setResponse(null);
  setError("");
  
  const isAnonymizeOnlyOp = data.endpoint === '/detect-pii-entities';
  setIsAnonymizeOnly(isAnonymizeOnlyOp);
  
  try {
    await new Promise(resolve => setTimeout(resolve, 3000)); // 8 second delay for testing
    
    handleResponse({
      ...data,
      anonymized_text: isAnonymizeOnlyOp ? data.processed_text : data.anonymized_text,
      processed_text: isAnonymizeOnlyOp ? '' : data.processed_text
    });
  } catch (err) {
    handleError(err instanceof Error ? err.message : 'An error occurred');
  }
};


  const handleResponse = (data: ProcessedResponse) => {
    setResponse(data);
    setIsLoading(false);
  }

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
  }

  const handleReset = () => {
    setResponse(null);
    setError("");
    setIsLoading(false);
    setOriginalText("");
    setIsAnonymizeOnly(false);
    formRef.current?.reset();
  };

  return (
    <div className="p-6">
      <div className="grid gap-6 grid-cols-2 min-h-[calc(100vh-3rem)]">
        {/* Form Section */}
        <div className="h-full">
          <Card className="p-6 h-full">
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
              onResponse={handleButtonClick}
              onError={handleError}
              onLoadingChange={setIsLoading}
              onTextChange={setOriginalText}
            />
          </Card>
        </div>

        {/* Response Section - Always visible */}
        <div className="h-full">
          <Card className="p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">Response</h2>
            
            {/* Original Text - Always visible if there's text */}
            {originalText && (
              <ResponseSection
                title="Original Text"
                content={originalText}
                isLoading={false}
              />
            )}

            {/* Anonymized Text - Always visible when loading or has response */}
            {(isLoading || response) && (
              <ResponseSection
                title="Anonymized Text"
                content={response?.anonymized_text || ''}
                isLoading={isLoading}
              />
            )}

            {/* Additional sections - Only for full anonymization */}
            {!isAnonymizeOnly && (isLoading || response) && (
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
  )
}

export default AnonymizePage