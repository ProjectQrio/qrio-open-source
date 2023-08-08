export default function CommentsComponent({ comments, onCommentSubmit }) {
    // Render comments and a form to add a comment
    return (
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment.commentText}</p>
        ))}
        <form onSubmit={onCommentSubmit}>
          <input type="text" name="comment" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  