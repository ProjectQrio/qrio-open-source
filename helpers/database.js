import { MongoClient} from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://nextjsuser:RD2kvgKHiqNN5Fz6G7WwuB8o@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database');
    }
  });

    return client;
}