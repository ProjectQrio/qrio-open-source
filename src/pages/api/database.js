import { MongoClient } from 'mongodb';

let cachedClient = null;

export async function connectToDatabase() {
    if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
        console.log('Using cached database instance');
        return { client: cachedClient, db: cachedClient.db(process.env.MONGODB_DB) };
    }    

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log('Connected to database');

    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('users');

    // Check if the index exists, if not create it
    if (!(await collection.indexExists('auth0Id_1'))) {
        await collection.createIndex({ auth0Id: 1 }, { unique: true });
        console.log('Unique index created for auth0Id');
    }

    cachedClient = client;
    return { client: client, db: db };
}
