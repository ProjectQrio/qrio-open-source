import { MongoClient } from 'mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  // If no session is found
  if (!session) {
    res.status(401).json({ message: 'Please create an account or log in to submit evidence.' });
    return;
  }

  // Continue to handle the request if the session exists
  if (req.method === 'POST') {
    const { sourceLink, position, summary, user } = req.body;

    const client = await MongoClient.connect('mongodb+srv://nextjsuser:RD2kvgKHiqNN5Fz6G7WwuB8o@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const evidencesCollection = db.collection('evidences');

    const result = await evidencesCollection.insertOne({ sourceLink, position, summary, user });

    client.close();

    res.status(200).json({ message: 'Evidence added successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
