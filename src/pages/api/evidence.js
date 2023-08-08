import { MongoClient } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = await getSession(req, res);

  const client = await MongoClient.connect(
    "mongodb+srv://nextjsuser:RD2kvgKHiqNN5Fz6G7WwuB8o@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const evidencesCollection = db.collection("evidences");

  try {
    if (!session || !session.user) {
      res
        .status(401)
        .json({
          message: "Please create an account or log in to submit evidence.",
        });
      return;
    }

    // Get the user from the session
    const user = session.user;

    // Continue to handle the request if the session exists
    if (req.method === "POST") {
      // Don't deconstruct the user from the request body here
      const { sourceLink, position, summary, userId, claimId } = req.body;

      // Create the new evidence object using the data from the request and the user from the session
      const newEvidence = { sourceLink, position, summary, userId, claimId };

      // Insert the new evidence object into the collection
      const result = await evidencesCollection.insertOne(newEvidence);

      res.status(200).json({ message: "Evidence added successfully!" });
    } else if (req.method === "GET") {
      const { claimId } = req.query;

      const evidence = await evidencesCollection.find({ claimId }).toArray();

      res.status(200).json(evidence);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).json({ message: `Method ${req.method} is not allowed` });
    }
  } finally {
    client.close();
  }
}
