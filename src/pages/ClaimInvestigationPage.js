import MainNavigation from "../components/MainNavigation.js";
import EvidenceGrid from "../components/claims-investigation/EvidenceGrid.js";
import EvidenceForm from "../components/claims-investigation/EvidenceForm.js";
import ClaimContent from "@/components/claims-investigation/ClaimContent.js";

function ClaimInvestigationPage() {
  return (
    <div>
      <MainNavigation></MainNavigation>
     <ClaimContent></ClaimContent>
      <EvidenceGrid></EvidenceGrid>
      <EvidenceForm></EvidenceForm>
    </div>
  );
}

export default ClaimInvestigationPage;
