import classes from "./evidence-grid.module.css";
import { useState } from 'react';

export default function EvidenceGrid({ evidence }) {
  const [localEvidence, setLocalEvidence] = useState(evidence);
  const [showingCommentFormFor, setShowingCommentFormFor] = useState(null);

  const handleCommentSubmit = async (e, evidenceId) => {
    e.preventDefault();

    const commentText = e.target.comment.value;

    // Here, you would call your API to add the comment
    const response = await fetch('/api/evidence/comment', {
      method: 'POST',
      body: JSON.stringify({ evidenceId, commentText }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Add error handling as needed...

    const updatedEvidence = localEvidence.map((item) => {
      if (item._id === evidenceId) {
        return {
          ...item,
          comments: [...(item.comments || []), { commentText /* Add other properties as needed */ }],
        };
      }
      return item;
    });

    setLocalEvidence(updatedEvidence);
  };

  const toggleCommentForm = (evidenceId) => {
    if (showingCommentFormFor === evidenceId) {
      setShowingCommentFormFor(null);
    } else {
      setShowingCommentFormFor(evidenceId);
    }
  };

  const renderEvidenceColumn = (evidenceItems) => (
    evidenceItems.map((evidenceItem, index) => (
      <div key={index} className={classes.evidenceCard}>
        <p className={classes.evidenceText}>{evidenceItem.summary}</p>
        <button onClick={() => toggleCommentForm(evidenceItem._id)}>+</button>
        {showingCommentFormFor === evidenceItem._id && (
          <form onSubmit={(e) => handleCommentSubmit(e, evidenceItem._id)}>
            <input type="text" name="comment" required />
            <button type="submit">Submit</button>
          </form>
        )}
        {evidenceItem.comments && evidenceItem.comments.map((comment, cIndex) => (
          <div key={cIndex} className={classes.comment}>
            <p>{comment.commentText}</p>
          </div>
        ))}
      </div>
    ))
  );

  return (
    <div className={classes.evidenceGrid}>
      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>For</h2>
        {renderEvidenceColumn(localEvidence.filter((e) => e.position === "for"))}
      </div>
      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>Against</h2>
        {renderEvidenceColumn(localEvidence.filter((e) => e.position === "against"))}
      </div>
    </div>
  );
}
