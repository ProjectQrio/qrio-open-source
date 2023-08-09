import { MongoClient } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = await getSession(req, res);

  const client = await MongoClient.connect(
    "mongodb+srv://nextjsuser:RD2kvgKHiqNN5Fz6G7WwuB8o@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const commentsCollection = db.collection("comments");

  try {
    if (req.method === 'GET') {
      // Handle the GET request to retrieve comments
      // Fetch the comments data from your database or any other source
      const comments = await commentsCollection.find({}).toArray(); // Fetch all comments
      res.status(200).json({ comments });
    } else if (req.method === "POST") {
      if (!session || !session.user) {
        res.status(401).json({ message: "Please log in to submit a comment." });
        return;
      }

      const { evidenceId, commentText, claimId } = req.body;
      const userId = session.user.sub; // Get the userId from the session

      // Insert the comment into the comments collection
      const result = await commentsCollection.insertOne({
        evidenceId,
        commentText,
        userId,
        claimId,
        timestamp: new Date(), // Add a timestamp
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
