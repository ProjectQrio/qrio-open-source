import classes from './comments.module.css';

export default function CommentsComponent({ comments, onDeleteComment, user }) {
  return (
    <div className={classes.commentsContainer}>
      {comments && comments.map((comment, index) => (
        <div key={index} className={classes.comment}>
          <div className={classes.commentHeader}>
            <span className={classes.commentAuthor}>{comment.authorName}</span>
            {user && comment.userId === user.sub && (
              <span 
                className={classes.deleteIcon} 
                onClick={() => {
                  console.log("Delete icon clicked for comment:", comment._id); 
                  onDeleteComment(comment._id);
                }}
              >
                ✕
              </span>
            )}
          </div>
          {/* Convert newline characters to <br> tags and render */}
          <div 
            dangerouslySetInnerHTML={{ 
              __html: comment.commentText.replace(/\n/g, '<br>') 
            }} 
          />
        </div>
      ))}
    </div>
  );
}
