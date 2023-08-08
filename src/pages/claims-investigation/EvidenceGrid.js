import classes from "./evidence-grid.module.css";

export default function EvidenceGrid({ evidence }) {
  const forEvidence = evidence.filter((e) => e.position === "for");
  const againstEvidence = evidence.filter((e) => e.position === "against");

  return (
    <div className={classes.evidenceGrid}>
      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>For</h2>

        {forEvidence.map((evidenceItem, index) => (
          <div key={index} className={classes.evidenceCard}>
            <p className={classes.evidenceText}>{evidenceItem.summary}</p>
          </div>
        ))}
      </div>

      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>Against</h2>

        {againstEvidence.map((evidenceItem, index) => (
          <div key={index} className={classes.evidenceCard}>
            <p className={classes.evidenceText}>{evidenceItem.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
