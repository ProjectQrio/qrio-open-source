import classes from "./evidence-grid.module.css";
import { useState, useEffect } from 'react';


export default function EvidenceGrid({ evidence, claimId, user }) {
  const [showCommentForm, setShowCommentForm] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [localEvidence, setLocalEvidence] = useState(evidence); // Rename this state variable
  const forEvidence = localEvidence.filter((e) => e.position === "for"); // Use the new state variable here
  const againstEvidence = localEvidence.filter((e) => e.position === "against"); // And here
  const isAuthenticated = !!user;

  useEffect(() => {
    setLocalEvidence(evidence); // Update the local state when evidence is updated
  }, [evidence]);

  async function submitComment(evidenceId, commentText) {
    const commentData = {
      userId: user.id,
      commentText: commentText,
      evidenceId: evidenceId,
      claimId: claimId,
    };

    const response = await fetch('/api/evidence', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    const responseData = await response.json();

    // Assuming the response contains the updated evidence
    if (response.ok) {
      // Update the comments for this evidence
      const updatedEvidence = localEvidence.map((item) => item._id.toString() === evidenceId
      ? { ...item, comments: [...item.comments, commentData] }
      : item
    );
    

      setLocalEvidence(updatedEvidence); // make sure to create this state variable
      setShowCommentForm(null); // close the comment form
    }
  }
  
  

  return (
    console.log("Received evidence:", evidence),
    <div className={classes.evidenceGrid}>
        <div className={classes.evidenceColumn}>
            <h2 className={classes.header}>For</h2>

            {forEvidence.map((evidenceItem, index) => (
                <div key={index} className={classes.evidenceCard}>
                    <p className={classes.evidenceText}>{evidenceItem.summary}</p>
                  
                    {/* Plus button to show comment form */}
                    <button onClick={() => setShowCommentForm(evidenceItem._id)}>+</button>

                    {/* Comment form for this evidence */}
                    {showCommentForm === evidenceItem._id && (
                        <div>
 {isAuthenticated ? (
                      <><input type="text" placeholder="Add your comment" onChange={(e) => setCommentText(e.target.value)} /><button onClick={() => submitComment(evidenceItem._id, commentText)}>Submit</button></>

) : (
        <p>Please log in to leave a comment.</p> // Show a message if the user is not authenticated
      )}
                        </div>
                    )}

                    {/* Displaying the comments for this evidence */}
                    {evidenceItem.comments && evidenceItem.comments.map(comment => (
                        <div className={classes.comment}>
                            {comment.text}
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
                    
                    {/* Plus button to show comment form */}
                    <button onClick={() => setShowCommentForm(evidenceItem._id)}>+</button>

                    {/* Comment form for this evidence */}
                    {showCommentForm === evidenceItem._id && (
                        <div>
                           {isAuthenticated ? (
                          <><input type="text" placeholder="Add your comment" onChange={(e) => setCommentText(e.target.value)} /><button onClick={() => submitComment(evidenceItem._id, commentText)}>Submit</button></>

) : (
  <p>Please log in to leave a comment.</p> // Show a message if the user is not authenticated
)}
                        </div>
                    )}

                    {/* Displaying the comments for this evidence */}
                    {evidenceItem.comments && evidenceItem.comments.map(comment => (
                        <div className={classes.comment}>
                            {comment.text}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

}
