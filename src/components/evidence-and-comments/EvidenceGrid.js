import classes from "./evidence-grid.module.css";
import { useState } from 'react';
import CommentsComponent from "./CommentsComponent";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function EvidenceGrid({ evidence, refetchEvidence, claimId }) {
  const { user, error, isLoading } = useUser();
  const [showingCommentFormFor, setShowingCommentFormFor] = useState(null);
  const [comments, setComments] = useState([]); // Add comments state

  const toggleCommentForm = (evidenceId) => {
    if (!user) {
      alert('Please log in to submit a comment.');
      return;
    }
  
    if (showingCommentFormFor === evidenceId) {
      setShowingCommentFormFor(null);
    } else {
      setShowingCommentFormFor(evidenceId);
    }
  };

  const renderEvidenceColumn = (evidenceItems) => (
    evidenceItems.map((evidenceItem, index) => {
        const formattedSummary = evidenceItem.summary.replace(/\n/g, '<br>');
        console.log(formattedSummary); // Use formattedSummary to log 

        return (
            <div key={index} className={classes.evidenceCard}>
                <a href={evidenceItem.sourceLink} target="_blank" rel="noopener noreferrer" className={classes.evidenceUrl}>
                    {evidenceItem.sourceLink}
                </a>
                {/* Use the formattedSummary here */}
                <div dangerouslySetInnerHTML={{ __html: formattedSummary }}/>
                <button onClick={() => toggleCommentForm(evidenceItem._id)}>+</button>
                {showingCommentFormFor === evidenceItem._id && (
                    <CommentsComponent
                        comments={evidenceItem.comments}
                        onCommentSubmit={(e, userId) => handleCommentSubmit(e, evidenceItem._id, userId, claimId)}
                        claimId={claimId}
                    />
                )}
            </div>
        );
    })
);



const handleCommentSubmit = async (event, evidenceId, userId, claimId) => {
  event.preventDefault();

  const commentText = event.target.comment.value;

    // Post the comment to /api/comments
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ evidenceId, commentText, claimId }),  // Include claimId
      headers: { 'Content-Type': 'application/json' },
    });

    // Add error handling as needed...

    // If the comment was successfully added, refetch the evidence
    if (response.ok) {
      refetchEvidence();

      // Fetch the updated comments for the specific claim ID
      const commentsResponse = await fetch(`/api/comments/${claimId}`);
      const commentsData = await commentsResponse.json();
      setComments(commentsData.comments);
    }
  };

  return (
    <div className={classes.evidenceGrid}>
      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>For</h2>
        {renderEvidenceColumn(evidence.filter((e) => e.position === "for"))}
      </div>
      <div className={classes.evidenceColumn}>
        <h2 className={classes.header}>Against</h2>
        {renderEvidenceColumn(evidence.filter((e) => e.position === "against"))}
      </div>
    </div>
  );
}