import { MongoClient } from 'mongodb';

// This function gets called at build time
export async function getStaticProps(context) {
  const { params } = context;

  const client = await MongoClient.connect('mongodb+srv://readuser:m2fYMhAwsrBb0c2iEq21fhx3@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const claimsCollection = db.collection('claims');

  const claim = await claimsCollection.findOne({ id: params.id });

  client.close();

  return {
    props: {
      claim: JSON.parse(JSON.stringify(claim)), // MongoDB data needs to be serialized
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://readuser:m2fYMhAwsrBb0c2iEq21fhx3@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const claimsCollection = db.collection('claims');

  const claims = await claimsCollection.find({}, { id: 1 }).toArray();

  client.close();

  return {
    paths: claims.map((claim) => ({ params: { id: claim.id.toString() } })),
    fallback: false, // See the documentation for a discussion of fallback
  };
}

export default function ClaimPage({ claim }) {
    // Render your page with the data
    return (
      <div>
        <h1>{claim.title}</h1>
        <img src={claim.image} alt={claim.title} />
        <p>{claim.description}</p>
      </div>
    );
  }
  
