import { MongoClient, ObjectId } from 'mongodb';
import MainNavigation from '../../../MainNavigation';
import EvidenceGrid from './EvidenceGrid';
import EvidenceForm from './EvidenceForm';
import classes from './claimpage.module.css'
import { useState, useEffect } from 'react';


async function fetchEvidence(claimId) {
  const res = await fetch(`/api/evidence?claimId=${claimId}`);

  if (!res.ok) {
    console.error(`Error fetching evidence: ${res.status} ${res.statusText}`);
    return [];
  }

  const evidence = await res.json();
  console.log(evidence); 
  return evidence;
}


// This function gets called at build time
export async function getStaticProps(context) {
  const { params } = context;

  const client = await MongoClient.connect('mongodb+srv://nextjsuser:RD2kvgKHiqNN5Fz6G7WwuB8o@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const claimsCollection = db.collection('claims');

  // Modify this line to use the _id field
  const claim = await claimsCollection.findOne({ _id: new ObjectId(params.claimId) });

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
    paths: claims.map((claim) => ({ params: { claimId: claim._id.toString() } })),
    fallback: 'blocking', // See the documentation for a discussion of fallback
  };
}

export default function ClaimPage({ claim }) {

  const [evidence, setEvidence] = useState([]);

// Fetch evidence on component mount
useEffect(() => {
  fetchEvidence(claim._id).then(evidenceData => {
    setEvidence(evidenceData);
    console.log(evidenceData);  // Log the fetched evidence
  });
}, [claim._id]);

// Function to refetch the evidence
const refetchEvidence = () => {
  fetchEvidence(claim._id).then(evidenceData => {
    setEvidence(evidenceData);
    console.log(evidenceData);  // Log the fetched evidence
  });
};

  // Render your page with the data
  return (
    <div>
      <MainNavigation></MainNavigation>
      <img className={classes.claimImage} src={claim.image} alt={claim.title} />
      <h1 className={classes.claimtitle}>{claim.title}</h1>
      <p className={classes.claimdescriptionp}>{claim.description}</p>
      <EvidenceGrid evidence={evidence}></EvidenceGrid>
      <EvidenceForm claimId={claim._id} onEvidenceSubmit={refetchEvidence}></EvidenceForm>
    </div>
  );
}
