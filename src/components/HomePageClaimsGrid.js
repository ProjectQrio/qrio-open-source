import Link from "next/link";

export default function HomePageClaimsGrid() {
    return (
      <div className="grid-container">
        <div className="grid-item">
        <Link href="/ClaimInvestigationPage">
        <img src="collectiveintelligence1.jpeg" alt="Description of Image 3" />
        </Link>
      </div>
      <div className="grid-item">
        <img src="collectiveintelligence2.jpeg" alt="Description of Image 3" />
      </div>
        <div className="grid-item">Item 3</div>
        <div className="grid-item">Item 4</div>
        <div className="grid-item">Item 5</div>
        <div className="grid-item">Item 6</div>
        <div className="grid-item">Item 7</div>
        <div className="grid-item">Item 8</div>
        <div className="grid-item">Item 9</div>
      </div>
    );
  }
  