import { Card } from 'antd'; // Import the Card component from Ant Design
import Link from "next/link";
import styles from './ClaimsGrid.module.css'; // import your CSS module
import { useEffect, useState } from 'react';

function ClaimsGrid({ claims: initialClaims }) {
  const [claims, setClaims] = useState(initialClaims);

  // If claims is not loaded yet, render a loading message
  if (!claims) {
    return <p>Loading...</p>;
  }

  // Inside your ClaimsGrid component
  useEffect(() => {
    Promise.all(
      claims.map(async (claim) => {
        const res = await fetch(`/api/counts?claimId=${claim.id}`);
        const { commentCount, evidenceCount } = await res.json();
  
        // Now you have the counts, you can store them in the state or directly in the claim object
        return { ...claim, commentCount, evidenceCount };
      })
    ).then(updatedClaims => setClaims(updatedClaims));
  }, [initialClaims]);

  // Now it's safe to map over the claims
  return (
    <div className={styles.claimsGrid}>
      {claims.map((claim) => (
        <div key={claim.id} className={styles.claimItem}>
          <Link href={`/claims-investigation/${claim.id}`} className={styles.claimLink}>
      
    

<Card
  className={`${styles.claimCard} ${styles.claimCardHover} ${styles.claimCardShadow}`}
  hoverable
  style={{ width: '96%' }}
  cover={<img alt={claim.title} src={claim.image} className={styles.claimImage} />}
>
  <Card.Meta/>
  <div className={styles.claimTitle}>{claim.title}</div>
  <div className={styles.claimStats}>
    <div className={styles.claimStat}>
      <div className={styles.evidenceLabel}>Evidence</div>
      <img src="/evidence-icon.png" alt="Evidence Icon" />
      <span>{claim.evidenceCount}</span>
    </div>
    <div className={styles.claimStat}>
      <div className={styles.commentsLabel}>Comments</div>
      <img src="/conversation-icon.png" alt="Comment Icon" />
      <span>{claim.commentCount}</span>
    </div>
  </div>
</Card>

          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClaimsGrid;