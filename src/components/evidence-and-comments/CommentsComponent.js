import { useState, useEffect } from 'react';
import classes from './comments.module.css';

export default function CommentsComponent({ comments, onCommentSubmit, claimId }) {
  const [session, setSession] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => setSession(data));
  }, []);

  // Render comments and a form to add a comment
  return (
    <div className={classes.commentsContainer}>
      {comments && comments.map((comment, index) => (
        <div key={index} className={classes.comment}>
          <span className={classes.commentAuthor}>{comment.authorName}</span>
          <p>{comment.commentText}</p>
        </div>
      ))}
      <form
        className={classes.commentFormContainer}
        onSubmit={(e) => {
          e.preventDefault();
          if (session && session.user) {
            onCommentSubmit(e, session.user.sub, claimId, commentText);
            setCommentText(""); // Clear the input
          }
        }}
      >
        <input
          className={classes.commentFormInput}
          type="text"
          name="comment"
          value={commentText} // Controlled input
          onChange={(e) => setCommentText(e.target.value)} // Update state on change
          required
        />
        <button className={classes.commentFormSubmitButton} type="submit">Submit</button>
      </form>
    </div>
  );
}
