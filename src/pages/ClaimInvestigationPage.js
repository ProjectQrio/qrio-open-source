import MainNavigation from "../../MainNavigation.js";
import EvidenceGrid from "./claims-investigation/EvidenceGrid.js";
import EvidenceForm from "./claims-investigation/EvidenceForm.js";
import ClaimContent from "@/pages/claims-investigation/ClaimContent.js";

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
