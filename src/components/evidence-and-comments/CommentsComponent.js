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
        onSubmit={async (e) => {
          e.preventDefault();
          if (session && session.user) {
            // Call the provided onCommentSubmit function
            onCommentSubmit(e, session.user.sub);




            // Update the user's comment count
            await fetch('/api/updateUserCommentCount', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: session.user.sub })
            });

            // Clear the comment input field
            setCommentText("");
          }
        }}
      >
        <input
          className={classes.commentFormInput}
          type="text"
          name="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button className={classes.commentFormSubmitButton} type="submit">Submit</button>
      </form>
    </div>
  );
}
