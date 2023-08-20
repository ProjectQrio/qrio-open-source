import { getSession } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "./database"; 

export default async function handler(req, res) {
  const session = await getSession(req, res);

  const { db, client } = await connectToDatabase();

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
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
  } finally {
    client.close();
  }
}
