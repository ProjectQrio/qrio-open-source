import clientPromise from './database';
const { ObjectId } = require('mongodb');  // Import ObjectId

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const evidencesCollection = db.collection('evidences');
    const claimsCollection = db.collection('claims');
    const usersCollection = db.collection('users');

    const latestEvidences = await evidencesCollection.find().sort({ _id: -1 }).limit(6).toArray();

    const enrichedEvidences = await Promise.all(latestEvidences.map(async (evidence) => {
        const claim = await claimsCollection.findOne({ _id: new ObjectId(evidence.claimId) });  // Convert claimId string to ObjectId
        const user = await usersCollection.findOne({ auth0Id: evidence.userId });  // Change to auth0Id for users collection

        if (!claim || !user) {
            console.warn(`Evidence with ID ${evidence._id} has missing claim or user.`);
            return null;
        }

        return {
            ...evidence,
            claimTitle: claim.title,
            name: user.name  // assuming 'name' is the field you want to retrieve from the 'users' collection
        };
    }));

    const filteredEvidences = enrichedEvidences.filter(evidence => evidence !== null);

    res.status(200).json(filteredEvidences);
};
