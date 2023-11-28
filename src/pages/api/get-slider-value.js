// pages/api/get-slider-value.js
import { connectToDatabase } from './database';
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    console.log('Handler called');  // Add this line
    console.log('User ID:', req.query.userId);
console.log('Claim ID:', req.query.claimId);

    const session = await getSession(req, res);
    console.log('Session:', session);  // Add this line

    if (!session || !session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const { userId, claimId } = req.query;
    const { db } = await connectToDatabase();
    const userDocument = await db.collection('users').findOne({ auth0Id: session.user.sub });
    console.log('User document:', userDocument);  // Add this line

    if (userDocument && userDocument.claims && userDocument.claims[claimId]) {
        const values = userDocument.claims[claimId];
        const lastValue = values[values.length - 1] || 0;
        console.log('Last value:', lastValue);
        return res.status(200).json({ value: lastValue });
    } else {
        console.log('Slider value not found');
        return res.status(404).json({ message: 'Slider value not found' });
    }
}