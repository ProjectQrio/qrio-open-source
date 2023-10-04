import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from './database';
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const evidencesCollection = db.collection("evidences");

  try {
    if (req.method === "POST") {
      if (!session || !session.user) {
        res.status(401).json({ message: "Unauthorized." });
        return;
      }

      const { sourceLink, position, summary, userId, claimId } = req.body;
      const newEvidence = { sourceLink, position, summary, userId, claimId, timestamp: new Date() };
      const result = await evidencesCollection.insertOne(newEvidence);
      res.status(200).json({ message: "Evidence added successfully!" });

    } else if (req.method === "DELETE") {
      if (!session || !session.user) {
        res.status(401).json({ message: "Unauthorized." });
        return;
      }

      const { evidenceId } = req.body;
      const evidenceItem = await evidencesCollection.findOne({ _id: new ObjectId(evidenceId) });
      if (evidenceItem.userId !== session.user.sub) {
        res.status(403).json({ message: "Unauthorized." });
        return;
      }
      await evidencesCollection.deleteOne({ _id: new ObjectId(evidenceId) });
      res.status(200).json({ message: "Evidence deleted successfully!" });

    } else if (req.method === "GET") {
      const { claimId } = req.query;
      const commentsCollection = db.collection("comments");
      const evidence = await evidencesCollection.find({ claimId }).toArray();

      for (let i = 0; i < evidence.length; i++) {
        const evidenceComments = await commentsCollection.find({ evidenceId: evidence[i]._id.toString() }).toArray();
        evidence[i].comments = evidenceComments;
      }

      res.status(200).json(evidence);

    } else {
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
  } catch(e){
    console.warn(e);
  }
}
