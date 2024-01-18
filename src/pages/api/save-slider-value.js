// pages/api/save-slider-value.js
import { connectToDatabase } from './database';
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    const session = await getSession(req, res);
    if (!session || !session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const { claimId, value } = req.body;
    const { db } = await connectToDatabase();

    await db.collection('users').updateOne(
        { auth0Id: session.user.sub },
        { $push: { [`claims.${claimId}`]: value } },
        { upsert: true }
    );
return res.status(200).json({ message: 'Value saved', value: value });
}