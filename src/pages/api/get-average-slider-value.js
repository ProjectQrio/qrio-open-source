import { connectToDatabase } from './database';

export default async function handler(req, res) {
    try {
        const { claimId } = req.query;
        const { db } = await connectToDatabase();
        const userDocuments = await db.collection('users').find({ [`claims.${claimId}`]: { $exists: true } }).toArray();

        const values = userDocuments.map(user => typeof user.claims[claimId] === 'number' ? user.claims[claimId] / 100 : user.claims[claimId].slice(-1)[0] / 100);
        const sum = values.reduce((a, b) => a + b, 0);
        const average = Math.round((sum / values.length) * 100); // Convert it back to a percentage and round to the nearest whole number

        return res.status(200).json({ average });
    } catch (error) {
        console.error('Error in get-average-slider-value:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}