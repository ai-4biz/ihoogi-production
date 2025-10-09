
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Tooltip from "@/components/Tooltip";
import VoiceInput from "@/components/VoiceInput";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "textarea" | "select" | "checkbox" | "file" | "social";
  placeholder?: string;
  tooltip?: string;
  value: string | string[] | boolean;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
  className?: string;
  hideVoice?: boolean;
  showExamples?: boolean;
  examples?: string;
  multiple?: boolean;
}

const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  tooltip,
  value,
  onChange,
  options,
  className = "",
  hideVoice = false,
  showExamples = false,
  examples,
  multiple = false,
}: FormFieldProps) => {
  const handleVoiceInput = (text: string) => {
    onChange(text);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center">
        <Label htmlFor={id} className="text-base font-medium">
          {label}
        </Label>
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      
      {showExamples && examples && (
        <p className="text-sm text-muted-foreground italic mb-2">{examples}</p>
      )}

      <div className="flex w-full items-center space-x-2 rtl:space-x-reverse">
        {type === "textarea" ? (
          <Textarea
            id={id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 resize-none"
            rows={3}
          />
        ) : type === "select" ? (
          <select
            id={id}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
            multiple={multiple}
          >
            <option value="" disabled>
              בחר...
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <div className="flex flex-wrap gap-4">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox
                  id={`${id}-${option.value}`}
                  checked={(value as string[])?.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange([...(value as string[] || []), option.value]);
                    } else {
                      onChange((value as string[])?.filter(v => v !== option.value));
                    }
                  }}
                />
                <Label htmlFor={`${id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        ) : type === "file" ? (
          <Input
            id={id}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file);
              }
            }}
            className="flex-1"
          />
        ) : (
          <Input
            id={id}
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
        )}
        
        {!hideVoice && (type === "text" || type === "textarea") && <VoiceInput onTranscript={handleVoiceInput} />}
      </div>
    </div>
  );
};

export default FormField;
