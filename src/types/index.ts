export interface ProcessedResponse {
    anonymized_text: string;
    faked_text?: string;
    faked_processed_text?: string;
    processed_text: string;
    endpoint?: string;
  }
  
  export interface AnonymizeFormRef {
    reset: () => void;
  }
  
  export interface AnonymizeFormProps {
    onResponse: (data: ProcessedResponse) => void;
    onError: (error: string) => void;
    onLoadingChange: (isLoading: boolean) => void;
    onTextChange: (text: string) => void;
  }