
import MainLayout from "@/components/layout/MainLayout";
import OrganizationsView from "@/components/organizations/OrganizationsView";
import { useUser } from "@/hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Organizations = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if user doesn't have organization access
    if (!user.subscription.isOrganization) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <MainLayout initialState="organizations">
      <OrganizationsView />
    </MainLayout>
  );
};

export default Organizations;
