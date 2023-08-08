import classes from "./evidence-grid.module.css";
import { useState } from 'react';


export default function EvidenceGrid({ evidence }) {
  const [showingCommentFormFor, setShowingCommentFormFor] = useState(null);
  const toggleCommentForm = (evidenceId) => {
    if (showingCommentFormFor === evidenceId) {
      setShowingCommentFormFor(null); // Hide the comment form if it's already open
    } else {
      setShowingCommentFormFor(evidenceId); // Show the comment form for this evidence
    }
  };
  const forEvidence = evidence.filter((e) => e.position === "for");
  const againstEvidence = evidence.filter((e) => e.position === "against");


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
  
    // Update the local state with the new comment
    const updatedEvidence = evidence.map((item) => {
      if (item._id === evidenceId) {
        return {
          ...item,
          comments: [...(item.comments || []), { commentText /* Add other properties as needed */ }],
        };
      }
      return item;
    });
  
    setEvidence(updatedEvidence);
  
    // Optionally, you can hide the comment form after submission
    setShowingCommentFormFor(null);
  };
  
  


  return (
    <div className={classes.evidenceGrid}>
      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>For</h2>

        {forEvidence.map((evidenceItem, index) => (
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
              <p>{comment.userName}: {comment.commentText}</p>
            </div>
          ))}
        </div>
        
        ))}
      </div>

      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>Against</h2>

        {againstEvidence.map((evidenceItem, index) => (
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
             <p>{comment.userName}: {comment.commentText}</p>
           </div>
         ))}
       </div>
      
        ))}
      </div>
    </div>
  );
}
