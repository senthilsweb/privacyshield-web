"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  text: string;
  prompt_template: string;
  temperature: number;
  model: string;
}

interface AnonymizeFormProps {
  onResponse: (response: any) => void;
  onError: (error: string) => void;
  onLoadingChange: (loading: boolean) => void;
  onTextChange: (text: string) => void;
}

// Define form ref type
export interface AnonymizeFormRef {
  reset: () => void;
}

const prompts = [
  {
    id: "1",
    title: "Incident Report",
    template:
      "Rewrite this text into an ServiceNow Incident Ticket:\n\n{anonymized_text}",
  },
  {
    id: "2",
    title: "Professional Email",
    template: "Transform this into a professional email:\n\n{anonymized_text}",
  },
];

const defaultFormData: FormData = {
  text: `Slim Shady recently lost his wallet. 
Inside is some cash and his credit card with the number 4916 0387 9536 0861. 
If you would find it, please call at 313-666-7440 or write an email here: real.slim.shady@gmail.com.`,
  prompt_template: prompts[0].template,
  temperature: 0.2,
  model: "gpt-3.5-turbo",
};

export const AnonymizeForm = forwardRef<AnonymizeFormRef, AnonymizeFormProps>(
  ({ onResponse, onError, onLoadingChange, onTextChange }, ref) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [promptError, setPromptError] = useState("");
    const [selectedPromptId, setSelectedPromptId] = useState("1");

    useEffect(() => {
      onTextChange(formData.text);
    }, [formData.text, onTextChange]);

    // Expose reset method via ref
    useImperativeHandle(ref, () => ({
      reset: () => {
        setFormData(defaultFormData);
        setPromptError("");
        setSelectedPromptId("1");
        onTextChange("");
      },
    }));

    const validatePrompt = (prompt: string) => {
      if (!prompt.includes("{anonymized_text}")) {
        setPromptError("Prompt must include {anonymized_text}");
        // Automatically append {anonymized_text} if missing
        return `${prompt}\n\n{anonymized_text}`;
      }
      setPromptError("");
      return prompt;
    };

    const handlePromptSelect = (value: string) => {
      setSelectedPromptId(value);
      const selectedPrompt = prompts.find((p) => p.id === value);
      if (selectedPrompt) {
        const validatedTemplate = validatePrompt(selectedPrompt.template);
        setFormData((prev) => ({
          ...prev,
          prompt_template: validatedTemplate,
        }));
      }
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      if (name === "prompt_template") {
        const validatedTemplate = validatePrompt(value);
        setFormData((prev) => ({
          ...prev,
          [name]: validatedTemplate,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    const handleSubmit = async (endpoint: string) => {
      if (!formData.text.trim()) {
        onError("Please enter some text to process");
        return;
      }

      onLoadingChange(true); // Signal to parent that loading is starting
      onError("");

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || "Failed to process request");
        }
        onResponse({ ...data, endpoint });
      } catch (err) {
        onError(err instanceof Error ? err.message : "An error occurred");
      }
      // Remove the loading state management from form - let page handle it
    };

    return (
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt-select">Prompt Template</Label>
          <Select onValueChange={handlePromptSelect} value={selectedPromptId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a prompt template" />
            </SelectTrigger>
            <SelectContent>
              {prompts.map((prompt) => (
                <SelectItem key={prompt.id} value={prompt.id}>
                  {prompt.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt_template">Selected Prompt</Label>
          <Textarea
            id="prompt_template"
            name="prompt_template"
            className="min-h-24 resize-none"
            placeholder="Your selected prompt template..."
            value={formData.prompt_template}
            onChange={handleInputChange}
          />
          {promptError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{promptError}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="text">User Text</Label>
          <Textarea
            id="text"
            name="text"
            className="min-h-24 resize-none"
            placeholder="Enter your text here..."
            value={formData.text}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature</Label>
          <Input
            id="temperature"
            name="temperature"
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={formData.temperature}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex space-x-4">
          <Button
            className="flex-1"
            onClick={() => handleSubmit("/detect-pii-entities")}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Anonymize Only"
            )}
          </Button>
          <Button
            className="flex-1"
            onClick={() => handleSubmit("/anonymize-and-transform")}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Anonymize and Transform"
            )}
          </Button>
        </div>
      </CardContent>
    );
  }
);

AnonymizeForm.displayName = "AnonymizeForm";
