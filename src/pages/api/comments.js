import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from './database';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const commentsCollection = db.collection("comments");

  try {
    if (req.method === 'GET') {
      const comments = await commentsCollection.find({}).toArray();
      res.status(200).json({ comments });
    } else if (req.method === "POST") {
      if (!session || !session.user) {
        res.status(401).json({ message: "Please log in to submit a comment." });
        return;
      }
      const { evidenceId, commentText, claimId } = req.body;
      const userId = session.user.sub;
      const authorName = session.user.name || session.user.nickname;

      const result = await commentsCollection.insertOne({
        evidenceId,
        commentText,
        userId,
        authorName,
        claimId,
        timestamp: new Date(),
      });

      res.status(200).json({ message: "Comment added successfully!" });
    } 
    else if (req.method === "DELETE") {
      const { commentId } = req.body;  // Get commentId from request body.
      
      if (!session || !session.user) {
        res.status(401).json({ message: "Please log in to delete a comment." });
        return;
      }
      
      const comment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });
      if (!comment) {
        res.status(404).json({ message: "Comment not found." });
        return;
      }
      
      if (comment.userId !== session.user.sub) {
        res.status(403).json({ message: "You do not have permission to delete this comment." });
        return;
      }
      
      await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
      res.status(200).json({ message: "Comment deleted successfully!" });
    }
    
    
    else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
  } catch(e){
    console.warn(e);
  }
}
