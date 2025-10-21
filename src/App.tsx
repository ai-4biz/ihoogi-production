
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentInspiration from "./pages/ContentInspiration";
import ArticleQuestionnaire from "./pages/ArticleQuestionnaire";
import MainDashboard from "./pages/MainDashboard";
import CreateQuestionnaire from "./pages/CreateQuestionnaire";
import Profile from "./pages/Profile";
import LeadsResponses from "./pages/LeadsResponses";
import Comments from "./pages/Comments";
import GenerateContent from "./pages/GenerateContent";
import Automations from "./pages/Automations";
import LeadsTable from "./pages/LeadsTable";
import LeadDetail from "./pages/LeadDetail";
import AffiliateProgram from "./pages/AffiliateProgram";
import Organizations from "./pages/Organizations";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import MyHoogi from "./pages/MyHoogi";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TermsOfService from "./pages/TermsOfService";
import SurveysPage from "./pages/surveys/index";
import Distribution from "./pages/Distribution";
import Guide from "./pages/Guide";
import QuestionnaireView from "./pages/QuestionnaireView";
import CreateTemplate from "./pages/CreateTemplate";
import Notifications from "./pages/Notifications";
import PartnersManagement from "./pages/PartnersManagement";
import ContactRoutingSettings from "./pages/ContactRoutingSettings";
import EmailTemplates from "./pages/EmailTemplates";
import EmailDesigns from "./pages/EmailDesigns";
import SystemOverview from "./pages/SystemOverview";
import Onboarding from "./pages/Onboarding";
import Messages from "./pages/Messages";
import { UserProvider } from "@/hooks/use-user";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainDashboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/main-dashboard" element={<MainDashboard />} />
              <Route path="/content-inspiration" element={<ContentInspiration />} />
              <Route path="/select-inspiration" element={<ContentInspiration />} />
              <Route path="/article-questionnaire" element={<ArticleQuestionnaire />} />
              <Route path="/simple-wizard" element={<ArticleQuestionnaire />} />
              <Route path="/create-questionnaire" element={<CreateQuestionnaire />} />
              <Route path="/surveys" element={<SurveysPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leads-responses" element={<LeadsResponses />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/generate-content" element={<GenerateContent />} />
              <Route path="/media-upload" element={<GenerateContent />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/leads-table" element={<LeadsTable />} />
              <Route path="/lead-detail" element={<LeadDetail />} />
              <Route path="/affiliate-program" element={<AffiliateProgram />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/subscription-plans" element={<SubscriptionPlans />} />
              <Route path="/my-hoogi" element={<MyHoogi />} />
              <Route path="/distribution" element={<Distribution />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/create-template" element={<CreateTemplate />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/partners" element={<PartnersManagement />} />
              <Route path="/my-partners" element={<PartnersManagement />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/admin/contact-routing" element={<ContactRoutingSettings />} />
              <Route path="/admin/email-templates" element={<EmailTemplates />} />
              <Route path="/admin/email-designs" element={<EmailDesigns />} />
              <Route path="/admin/system-overview" element={<SystemOverview />} />
              <Route path="/questionnaire-view/:id" element={<QuestionnaireView />} />
              <Route path="/questionnaire-view/preview" element={<QuestionnaireView />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner position="top-center" closeButton={true} richColors={true} />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
