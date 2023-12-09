import { connectToDatabase } from './database';
const { ObjectId } = require('mongodb');

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const commentsCollection = db.collection('comments');
  const evidencesCollection = db.collection('evidences');

  const claimId = req.query.claimId;

  console.log('claimId:', claimId);
  const commentCount = await commentsCollection.countDocuments({ claimId });
  console.log('commentCount:', commentCount);
  const evidenceCount = await evidencesCollection.countDocuments({ claimId });
  console.log('evidenceCount:', evidenceCount);

  res.status(200).json({ commentCount, evidenceCount });
};