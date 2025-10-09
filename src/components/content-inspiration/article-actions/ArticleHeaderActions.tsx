
import { toast } from "@/hooks/use-toast";

const ArticleHeaderActions = () => {
  const handleCopyLink = (event: React.MouseEvent) => {
    event.stopPropagation();
    toast({
      title: "קישור הועתק",
    });
  };

  const handleRepublish = (event: React.MouseEvent) => {
    event.stopPropagation();
    toast({
      title: "פתיחת אפשרויות הפצה",
    });
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    toast({
      title: "מעבר לעריכה",
    });
  };

  return (
    <div className="flex gap-1">
      <button 
        className="icon-btn w-5 h-5 flex items-center justify-center cursor-pointer"
        onClick={handleCopyLink}
        title="העתק קישור"
      >
        🔗
      </button>
      
      <button 
        className="icon-btn w-5 h-5 flex items-center justify-center cursor-pointer"
        onClick={handleRepublish}
        title="הפצה לרשת אחרת"
      >
        🔄
      </button>
      
      <button 
        className="icon-btn w-5 h-5 flex items-center justify-center cursor-pointer"
        onClick={handleEdit}
        title="עריכה"
      >
        ✏️
      </button>
      
      <button 
        className="icon-btn w-5 h-5 flex items-center justify-center cursor-pointer"
        title="לידים: 0"
      >
        📥
      </button>
      
      <button 
        className="icon-btn w-5 h-5 flex items-center justify-center cursor-pointer"
        title="תגובות: 0"
      >
        💬
      </button>
    </div>
  );
};

export default ArticleHeaderActions;
