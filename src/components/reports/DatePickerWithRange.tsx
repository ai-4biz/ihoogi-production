import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

interface DatePickerWithRangeProps {
  date: { from: Date | undefined; to: Date | undefined };
  onDateChange: (date: { from: Date | undefined; to: Date | undefined }) => void;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  date,
  onDateChange
}) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-start text-right font-normal"
      onClick={() => {
        // Simple date picker for now
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        onDateChange({ from: lastMonth, to: today });
      }}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date?.from ? (
        date.to ? (
          <>
            {date.from.toLocaleDateString('he-IL')} - {date.to.toLocaleDateString('he-IL')}
          </>
        ) : (
          date.from.toLocaleDateString('he-IL')
        )
      ) : (
        <span>בחר טווח תאריכים</span>
      )}
    </Button>
  );
};
