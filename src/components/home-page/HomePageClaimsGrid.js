import Link from "next/link";
import classes from "./HomePageClaimsGrid.module.css"

export default function HomePageClaimsGrid() {
    return (
      <div className={classes.gridContainer}>
        <div className={classes.gridItem}>
        <Link href="/ClaimInvestigationPage">
        <img src="collectiveintelligence1.jpeg" alt="Description of Image 3" />
        </Link>
      </div>
      <div className={classes.gridItem}>
        <img src="collectiveintelligence2.jpeg" alt="Description of Image 3" />
      </div>
      <div className={classes.gridItem}>Item 3</div>
      <div className={classes.gridItem}>Item 4</div>
      <div className={classes.gridItem}>Item 5</div>
      <div className={classes.gridItem}>Item 6</div>
      </div>
    );
  }
  