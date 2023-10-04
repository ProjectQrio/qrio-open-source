import clientPromise from './database';

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const userId = req.body.userId; // Assuming you're passing userId in the body of the request

        const usersCollection = db.collection('users');

        await usersCollection.updateOne(
            { auth0Id: userId },
            { $inc: { evidenceCount: 1 } }
        );

        res.status(200).json({ message: 'Evidence count updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update evidence count.' });
    }
}
