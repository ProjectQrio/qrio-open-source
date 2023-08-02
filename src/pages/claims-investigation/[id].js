import { MongoClient, ObjectId } from 'mongodb';
import MainNavigation from '../../../MainNavigation';
import EvidenceGrid from './EvidenceGrid';
import EvidenceForm from './EvidenceForm';
import classes from './claimpage.module.css'

// This function gets called at build time
export async function getStaticProps(context) {
  const { params } = context;

  const client = await MongoClient.connect('mongodb+srv://readuser:m2fYMhAwsrBb0c2iEq21fhx3@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const claimsCollection = db.collection('claims');

  // Modify this line to use the _id field
  const claim = await claimsCollection.findOne({ _id: new ObjectId(params.id) });

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

  const claims = await claimsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: claims.map((claim) => ({ params: { id: claim._id.toString() } })),
    fallback: 'blocking', // See the documentation for a discussion of fallback
  };
}

export default function ClaimPage({ claim }) {
  // Render your page with the data
  return (
    <div>
      <MainNavigation></MainNavigation>
      <img className={classes.claimImage} src={claim.image} alt={claim.title} />
      <h1 className={classes.claimtitle}>{claim.title}</h1>
      <p className={classes.claimdescriptionp}>{claim.description}</p>
      <EvidenceGrid></EvidenceGrid>
    <EvidenceForm></EvidenceForm>
    </div>
  );
}
