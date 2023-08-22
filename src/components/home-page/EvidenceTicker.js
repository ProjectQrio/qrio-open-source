import { useState, useEffect } from "react";
import styles from "./EvidenceTicker.module.css";

export default function EvidenceTicker() {
  const [evidences, setEvidences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/latest-evidence");
        if (!res.ok) {
          console.error("API error:", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        console.log("Fetched evidences:", data);
        setEvidences(data);
      } catch (error) {
        console.error("Failed fetching evidences:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.tickerContainer}>
      {evidences.map((evidence) => (
        <div key={evidence._id} className={styles.evidenceItem}>
          <p>
            <span className={styles.userName}>{evidence.name}</span>:
            <span className={styles.evidenceSummary}>
              {evidence.summary ? evidence.summary.slice(0, 150) : ""}
              {evidence.summary && evidence.summary.length > 150 && "..."}
            </span>
          </p>
          <a href={`/claims-investigation/${evidence.claimId}`}>See Claim</a>
        </div>
      ))}
    </div>
  );
}
