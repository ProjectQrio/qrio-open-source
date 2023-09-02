import { getSession } from "@auth0/nextjs-auth0";
import { connectToDatabase } from './database';

export default async function handler(req, res) {
  const session = await getSession(req, res);

  const { client, db } = await connectToDatabase();
  const evidencesCollection = db.collection("evidences");

  try {
    if (req.method === "POST") {
      // Check for logged-in users before allowing to post evidence
      if (!session || !session.user) {
        res.status(401).json({
          message: "Please create an account or log in to submit evidence.",
        });
        return;
      }

      const { sourceLink, position, summary, userId, claimId } = req.body;
      const newEvidence = { sourceLink, position, summary, userId, claimId, timestamp: new Date() };
      const result = await evidencesCollection.insertOne(newEvidence);
      res.status(200).json({ message: "Evidence added successfully!" });
    } 
    else if (req.method === "GET") {
      // Allow all users to fetch evidence, no need to check for session
      const { claimId } = req.query;
      const commentsCollection = db.collection("comments");
      const evidence = await evidencesCollection.find({ claimId }).toArray();

      for (let i = 0; i < evidence.length; i++) {
        const evidenceComments = await commentsCollection.find({ evidenceId: evidence[i]._id.toString() }).toArray();
        evidence[i].comments = evidenceComments;
      }

      res.status(200).json(evidence);
    } 
    else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
  } finally {
    client.close();
  }
}
