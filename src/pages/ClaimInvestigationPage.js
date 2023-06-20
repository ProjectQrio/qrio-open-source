import MainNavigation from "../components/MainNavigation.js";
import EvidenceGrid from "../components/EvidenceGrid.js";
import EvidenceForm from "../components/EvidenceForm.js";

function ClaimInvestigationPage() {
  return (
    <div>
      <MainNavigation></MainNavigation>
      <br />
      <br />
      <center>
        <h1>Claim Title</h1>
        <br /> <br />
        <p className="claimdescriptionp">Claim Description Paragraph</p>
      <br />
      </center>
      <br />
      <br />
      <EvidenceGrid></EvidenceGrid>
      <EvidenceForm></EvidenceForm>
    </div>
  );
}

export default ClaimInvestigationPage;
