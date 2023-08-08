import MainNavigation from "../../MainNavigation.js";
import EvidenceGrid from "../components/evidence-and-comments/EvidenceGrid.js";
import EvidenceForm from "../components/evidence-and-comments/EvidenceForm.js";
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
