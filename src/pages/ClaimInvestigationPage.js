import Header from "../components/Header.js";
import EvidenceGrid from "../components/EvidenceGrid.js";
import EvidenceForm from "../components/EvidenceForm.js";

function ClaimInvestigationPage() {
  return (
    <div>
      <Header></Header>
      <br />
      <br />
      <center>
        <h1>Claim Title</h1>
      </center>
      <br />
      <br />
      <EvidenceGrid></EvidenceGrid>
      <EvidenceForm></EvidenceForm>
    </div>
  );
}

export default ClaimInvestigationPage;