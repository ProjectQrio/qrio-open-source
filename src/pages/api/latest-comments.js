import clientPromise from './database';
const { ObjectId } = require('mongodb');  // Import ObjectId

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const commentsCollection = db.collection('comments');
    const claimsCollection = db.collection('claims');
    const usersCollection = db.collection('users');

    const latestComments = await commentsCollection.find().sort({ _id: -1 }).limit(6).toArray();

    const enrichedComments = await Promise.all(latestComments.map(async (comments) => {
        const claim = await claimsCollection.findOne({ _id: new ObjectId(comments.claimId) });  // Convert claimId string to ObjectId
        const user = await usersCollection.findOne({ auth0Id: comments.userId });  // Change to auth0Id for users collection

        if (!claim || !user) {
            console.warn(`Comments with ID ${comments._id} has missing claim or user.`);
            return null;
        }

        return {
            ...comments,
            claimTitle: claim.title,
            name: user.name  // assuming 'name' is the field you want to retrieve from the 'users' collection
        };
    }));

    const filteredComments = enrichedComments.filter(comments => comments !== null);

    res.status(200).json(filteredComments);
};
