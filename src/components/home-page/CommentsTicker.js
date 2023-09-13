import { useState, useEffect } from "react";
import styles from "./CommentsTicker.module.css";

export default function CommentsTicker() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/latest-comments");
        if (!res.ok) {
          console.error("API error:", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        console.log("Fetched comments:", data);
        setComments(data);
      } catch (error) {
        console.error("Failed fetching comments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.commentsTickerContainer}>
      {comments.map((comment) => ( // Changed variable name for clarity
        <div key={comment._id} className={styles.commentsItem}>
          <p>
            <span className={styles.commentsUserName}>{comment.name}</span>:
            <span className={styles.commentsSummary}>
              {comment.commentText ? comment.commentText.slice(0, 75) : ""}
              {comment.commentText && comment.commentText.length > 75 && "..."}
            </span>
          </p>
          <a className={styles.seeCommentClaimLink} href={`/claims-investigation/${comment.claimId}`}>See Claim</a>
        </div>
      ))}
    </div>
  );
}
