import classes from './comments.module.css';

export default function CommentsComponent({ comments }) { // Removed onCommentSubmit, claimId
  return (
    <div className={classes.commentsContainer}>
  
      {comments && comments.map((comment, index) => (
        <div key={index} className={classes.comment}>
          <span className={classes.commentAuthor}>{comment.authorName}</span>
          <p>{comment.commentText}</p>
        </div>
      ))}
    </div>
  );
}
