import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SurveyPickerProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; name: string }>;
}

const SurveyPicker = ({ value, onChange, options }: SurveyPickerProps) => {
  return (
    <div className="w-full" dir="rtl">
      <label className="block text-sm font-semibold mb-2 text-foreground">בחרי שאלון</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-background w-full border-border">
          <SelectValue placeholder="בחרי שאלון להפצה" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50 border-border">
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SurveyPicker;
