import classes from "./evidence-grid.module.css";

function ForEvidence(props) {
  return (
    <div className={classes.evidenceText}>
      {props.evidence.map((evidence) => (
        <EvidenceItem
          key={evidence.id}
          id={evidence.id}
          user={evidence.user}
          source={evidence.source}
          summary={evidence.summary}
        />
      ))}
    </div>
  );
}

export default ForEvidence;
