import { useState, useEffect } from 'react';

export default function CommentsComponent({ comments, onCommentSubmit, claimId }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => setSession(data));
  }, []);

  // Render comments and a form to add a comment
  return (
    <div>
      {comments && comments.map((comment, index) => (
        <p key={index}>{comment.commentText}</p>
      ))}
<form onSubmit={(e) => {
  e.preventDefault();
  if (session && session.user) {
    onCommentSubmit(e, session.user.sub, claimId);
  }
}}>
  <input type="text" name="comment" required />
  <button type="submit">Submit</button>
</form>
    </div>
  );
}