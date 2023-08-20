import { getSession } from "@auth0/nextjs-auth0";
import { connectToDatabase } from './database'; 

export default async function handler(req, res) {
  const session = await getSession(req, res);

  const { client, db } = await connectToDatabase();
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
      const { sourceLink, position, summary, userId, claimId } = req.body;
    
      // Create the new evidence object using the data from the request and the user from the session
      const newEvidence = { sourceLink, position, summary, userId, claimId, timestamp: new Date() };
    
      // Insert the new evidence object into the collection
      const result = await evidencesCollection.insertOne(newEvidence);
    
      res.status(200).json({ message: "Evidence added successfully!" });
    }
  
    else if (req.method === "GET") {
      const { claimId } = req.query;
    
      const commentsCollection = db.collection("comments"); // Assuming you have a 'comments' collection
    
      const evidence = await evidencesCollection.find({ claimId }).toArray();
    
      // Fetch comments for each evidence and attach them
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
