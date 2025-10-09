import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, MessageCircle, QrCode, Copy, Eye, X } from "lucide-react";
import { useState, useEffect } from "react";
import ActiveBadgeToggle from "./ActiveBadgeToggle";

interface GeneratedLink {
  id: string;
  type: "form" | "chat" | "qr";
  url: string;
  active: boolean;
}

interface QuickLinksProps {
  currentUrl: string;
  onBuild: (type: "form" | "chat" | "qr") => void;
  onCopy: () => void;
  onPreview?: (link: GeneratedLink) => void;
  disabled?: boolean;
}

const QuickLinks = ({ currentUrl, onBuild, onCopy, onPreview, disabled }: QuickLinksProps) => {
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);

  const handleBuild = (type: "form" | "chat" | "qr") => {
    onBuild(type);
    // Add to generated links list
    if (!disabled) {
      const newLink: GeneratedLink = {
        id: `${type}-${Date.now()}`,
        type,
        url: "", // Will be filled when currentUrl updates
        active: true,
      };
      setGeneratedLinks((prev) => [...prev, newLink]);
    }
  };

  // Update the last generated link with the current URL
  useEffect(() => {
    if (currentUrl && generatedLinks.length > 0) {
      const lastLink = generatedLinks[generatedLinks.length - 1];
      if (lastLink.url !== currentUrl) {
        setGeneratedLinks((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...lastLink, url: currentUrl };
          return updated;
        });
      }
    }
  }, [currentUrl, generatedLinks]);

  const handleToggleActive = (id: string, active: boolean) => {
    setGeneratedLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, active } : link))
    );
  };

  const handleRemoveLink = (id: string) => {
    setGeneratedLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleCopyLink = (url: string) => {
    if (url) {
      navigator.clipboard.writeText(url);
      onCopy();
    }
  };

  const handlePreview = (link: GeneratedLink) => {
    if (onPreview) {
      onPreview(link);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "form":
        return "טופס";
      case "chat":
        return "צ'אט";
      case "qr":
        return "QR";
      default:
        return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "form":
        return <FileText className="h-4 w-4" />;
      case "chat":
        return <MessageCircle className="h-4 w-4" />;
      case "qr":
        return <QrCode className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Build Buttons */}
      <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground">יצירת קישורים</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={() => handleBuild("form")}
            disabled={disabled}
            className="h-16 md:h-20 flex flex-col items-center gap-2 bg-primary hover:bg-primary/90 text-white"
          >
            <FileText className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-semibold text-sm md:text-base">טופס</span>
          </Button>
          <Button
            onClick={() => handleBuild("chat")}
            disabled={disabled}
            className="h-16 md:h-20 flex flex-col items-center gap-2 bg-secondary hover:bg-secondary/90 text-white"
          >
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-semibold text-sm md:text-base">צ'אט</span>
          </Button>
          <Button
            onClick={() => handleBuild("qr")}
            disabled={disabled}
            className="h-16 md:h-20 flex flex-col items-center gap-2 bg-accent hover:bg-accent/90 text-white"
          >
            <QrCode className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-semibold text-sm md:text-base">QR</span>
          </Button>
        </div>

        {disabled && (
          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4">בחרי שאלון כדי ליצור קישור</p>
        )}
      </div>

      {/* Generated Links List */}
      {generatedLinks.length > 0 && (
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground">קישורים שנוצרו</h3>
          <div className="space-y-3">
            {generatedLinks.map((link) => (
              <div
                key={link.id}
                className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 p-3 md:p-4 bg-muted/50 rounded-lg border border-border"
              >
                {/* Type Icon & Label */}
                <div className="flex items-center gap-2 min-w-[80px]">
                  {getTypeIcon(link.type)}
                  <span className="text-sm font-medium text-foreground">{getTypeLabel(link.type)}</span>
                </div>

                {/* URL Input */}
                <Input
                  value={link.url || "מייצר קישור..."}
                  readOnly
                  className="flex-1 bg-background text-xs md:text-sm"
                  dir="ltr"
                />

                {/* Action Icons */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handlePreview(link)}
                    className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 hover:text-primary"
                    title="הצג תצוגה מקדימה"
                    disabled={!link.url}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopyLink(link.url)}
                    className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-primary/10 hover:text-primary"
                    title="העתק קישור"
                    disabled={!link.url}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveLink(link.id)}
                    className="h-8 w-8 md:h-9 md:w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    title="מחק"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Active Toggle */}
                <ActiveBadgeToggle
                  active={link.active}
                  onChange={(next) => handleToggleActive(link.id, next)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickLinks;
