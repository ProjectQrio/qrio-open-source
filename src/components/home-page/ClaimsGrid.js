import Link from "next/link";
import styles from './ClaimsGrid.module.css'; // import your CSS module

function ClaimsGrid({ claims }) {
  // If claims is not loaded yet, render a loading message
  if (!claims) {
    return <p>Loading...</p>;
  }

  // Now it's safe to map over the claims
  return (
    <div className={styles.claimsGrid}>
      {claims.map((claim) => (
        <div key={claim.id} className={styles.claimItem}>
          <Link href={`/claims-investigation/${claim.id}`}>
              <img className={styles.claimImage} src={claim.image} alt={claim.title} />
              <h2 className={styles.claimTitle}>{claim.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClaimsGrid;
