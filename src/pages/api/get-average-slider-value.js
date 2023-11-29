// pages/api/get-average-slider-value.js
import { connectToDatabase } from './database';

export default async function handler(req, res) {
    try {
        const { claimId } = req.query;
        const { db } = await connectToDatabase();
        const userDocuments = await db.collection('users').find({ [`claims.${claimId}`]: { $exists: true } }).toArray();

        const values = userDocuments.map(user => user.claims[claimId].slice(-1)[0]);const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 50;
        return res.status(200).json({ average });
    } catch (error) {
        console.error('Error in get-average-slider-value:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}