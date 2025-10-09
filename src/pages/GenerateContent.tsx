
import { useEffect } from "react";
import ContentTabbedLayout from "@/components/generate-content/ContentTabbedLayout";
import GenerateContentHeader from "@/components/generate-content/GenerateContentHeader";
import MainLayout from "@/components/layout/MainLayout";

const GenerateContent = () => {
  return (
    <MainLayout initialState="content">
      <div className="max-w-6xl mx-auto px-4">
        <GenerateContentHeader />
        <ContentTabbedLayout />
      </div>
    </MainLayout>
  );
};

export default GenerateContent;
