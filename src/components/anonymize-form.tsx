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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const prompts = [
  {
    id: "1",
    title: "Incident Report",
    template: "Rewrite this text into an ServiceNow Incident Ticket:\n\n{anonymized_text}",
  },
  {
    id: "2",
    title: "Professional Email",
    template: "Transform this into a professional email:\n\n{anonymized_text}",
  },
];

const llmModels = [
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "llama3.2", name: "LLaMA 3.2" },
];

const actionTypes = [
  { id: "detect", label: "Detect PII Entities", endpoint: "/detect-pii-entities" },
  { id: "anonymize", label: "Anonymize", endpoint: null },
  { id: "enhance", label: "Enhance with LLM and Reverse Anonymize", endpoint: "/anonymize-and-transform" }
];

const defaultFormData = {
  text: `Slim Shady recently lost his wallet. 
Inside is some cash and his credit card with the number 4916 0387 9536 0861. 
If you would find it, please call at 313-666-7440 or write an email here: real.slim.shady@gmail.com.`,
  prompt_template: prompts[0].template,
  temperature: 0.2,
  model: "gpt-3.5-turbo",
};

export const AnonymizeForm = forwardRef(({ onResponse, onError, onLoadingChange, onTextChange }, ref) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [promptError, setPromptError] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState("1");
  const [selectedAction, setSelectedAction] = useState("detect");

  useEffect(() => {
    onTextChange(formData.text);
  }, [formData.text, onTextChange]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setFormData(defaultFormData);
      setPromptError("");
      setSelectedPromptId("1");
      setSelectedAction("detect");
      onTextChange("");
    },
  }));

  const validatePrompt = (prompt) => {
    if (!prompt.includes("{anonymized_text}")) {
      setPromptError("Prompt must include {anonymized_text}");
      return `${prompt}\n\n{anonymized_text}`;
    }
    setPromptError("");
    return prompt;
  };

  const handlePromptSelect = (value) => {
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

  const handleInputChange = (e) => {
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

  const handleModelChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      model: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.text.trim()) {
      onError("Please enter some text to process");
      return;
    }

    const selectedActionType = actionTypes.find(action => action.id === selectedAction);
    if (!selectedActionType) {
      onError("Invalid action selected");
      return;
    }

    // Handle the "Anonymize" action which is not implemented
    if (selectedAction === 'anonymize') {
      onError("This feature is not implemented yet. Please try other options.");
      return;
    }

    onLoadingChange(true);
    onError("");

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-privacyshield.nathansweb.com";

    try {
      const response = await fetch(`${baseUrl}${selectedActionType.endpoint}`, {
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
      onResponse({ ...data, endpoint: selectedActionType.endpoint });
    } catch (err) {
      onError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="space-y-6">
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
        <Label htmlFor="model-select">LLM Model</Label>
        <Select onValueChange={handleModelChange} value={formData.model}>
          <SelectTrigger>
            <SelectValue placeholder="Select an LLM model" />
          </SelectTrigger>
          <SelectContent>
            {llmModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
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

      <div className="space-y-2">
        <Label>Action Type</Label>
        <RadioGroup
          value={selectedAction}
          onValueChange={setSelectedAction}
          className="flex flex-col space-y-1"
        >
          {actionTypes.map((action) => (
            <div key={action.id} className="flex items-center space-x-2">
              <RadioGroupItem value={action.id} id={action.id} />
              <Label htmlFor={action.id}>{action.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Process Text"
        )}
      </Button>
    </div>
  );
});

AnonymizeForm.displayName = "AnonymizeForm";