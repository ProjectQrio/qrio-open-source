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
              {user && evidenceItem.userId === user.sub && (
          <div className={classes.actionIcons}>
      
            <span className={classes.deleteIcon} onClick={() => handleDeleteEvidence(evidenceItem._id)}>✕</span>
          </div>
        )}
              <a href={evidenceItem.sourceLink} target="_blank" rel="noopener noreferrer" className={classes.evidenceUrl}>
                  {evidenceItem.sourceLink}
              </a>
              <div className={classes.evidenceText} dangerouslySetInnerHTML={{ __html: formattedSummary }}/>
        
              <CommentsComponent
  comments={evidenceItem.comments}
  claimId={claimId}
  user={user}
  onDeleteComment={handleDeleteComment}
/>

      
      <div className={classes.toggleAndTextContainer}>
  <button className={classes.toggleButton} onClick={() => toggleCommentForm(evidenceItem._id)}>+</button>
  <span className={classes.addCommentText} onClick={() => toggleCommentForm(evidenceItem._id)}>Add a Comment</span>
</div>

      
              {showingCommentFormFor === evidenceItem._id && user && (
                  <form className={classes.commentFormContainer} onSubmit={(e) => handleCommentSubmit(e, evidenceItem._id, user.sub, claimId)}>
                      <input className={classes.commentFormInput}
                          type="text"
                          name="comment"
                          placeholder="Enter your comment here..."
                          required
                      />
                      <button className={classes.commentFormSubmitButton} type="submit">Submit</button>
                  </form>
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

  const handleDeleteEvidence = async (evidenceId) => {
    const response = await fetch('/api/evidence', {
      method: 'DELETE',
      body: JSON.stringify({ evidenceId }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      refetchEvidence();
    }
    // Handle errors as needed.
  };
  
  const handleDeleteComment = async (commentId) => {
    console.log("Trying to delete comment:", commentId);
    const response = await fetch('/api/comments', {
      method: 'DELETE',
      body: JSON.stringify({ commentId }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      refetchEvidence();
    }
    // Handle errors as needed.
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