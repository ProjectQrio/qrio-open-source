import { connectToDatabase } from './database';

export default async function handler(req, res) {
    const { userId, userName } = req.body;  // Destructure userName from the request body.
  
    const { db } = await connectToDatabase();
    const collection = db.collection('users');
  
    const user = await collection.findOne({ auth0Id: userId });
  
    try {
      const today = new Date().toISOString().split('T')[0];
  
      // If the user doesn't exist, insert them into the database
      if (!user) {
        // Inside the if (!user) block:
await collection.insertOne({
    auth0Id: userId,
    name: userName,
    lastLogin: new Date(),
    loginCount: 1,
    commentsCount: 0,   // New field
    evidencesCount: 0   // New field
  });
  
        console.log('Added a new user to the database.');
      }
  
        // If the user exists but hasn't logged in today, update their lastLogin and increment loginCount
        else if (user.lastLogin !== today) {
            await collection.updateOne(
                { auth0Id: userId },
                {
                    $set: { lastLogin: new Date() },
                    $inc: { loginCount: 1 }
                }
            );
            console.log('Incremented login count for existing user.');
        } else {
            console.log('User already logged in today, not incrementing login count.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    
    res.status(200).json({ success: true });
}

