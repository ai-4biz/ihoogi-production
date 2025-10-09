interface ActiveBadgeToggleProps {
  active: boolean;
  onChange: (next: boolean) => void;
}

const ActiveBadgeToggle = ({ active, onChange }: ActiveBadgeToggleProps) => {
  return (
    <button
      onClick={() => onChange(!active)}
      aria-pressed={active}
      aria-label={active ? "השבת שאלון" : "הפעל שאלון"}
      className="flex items-center gap-2 group"
      type="button"
    >
      <span className="text-xs text-muted-foreground">{active ? "פעיל" : "כבוי"}</span>
      <div
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          active ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-background shadow-sm transition-transform ${
            active ? "translate-x-[1.35rem]" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
};

export default ActiveBadgeToggle;
