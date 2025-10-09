import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface PreviewPaneProps {
  mode: "form" | "chat" | "qr";
  url: string;
}

const PreviewPane = ({ mode, url }: PreviewPaneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mode === "qr" && canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
    }
  }, [mode, url]);

  if (mode === "qr") {
    return (
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]" dir="rtl">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground">הצגת QR</h3>
        <canvas ref={canvasRef} className="max-w-full h-auto border border-border rounded-lg" />
        <p className="text-xs text-muted-foreground mt-4 text-center">סרוק את הקוד כדי לגשת לשאלון</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden" dir="rtl">
      <div className="bg-muted/50 border-b border-border px-4 py-2">
        <h3 className="text-sm font-semibold text-foreground">
          {mode === "form" ? "הצגת טופס" : "הצגת צ'אט"}
        </h3>
      </div>
      <div className="relative" style={{ height: "600px" }}>
        <iframe
          src={url}
          className="w-full h-full border-0"
          title={mode === "form" ? "תצוגת טופס" : "תצוגת צ'אט"}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default PreviewPane;
