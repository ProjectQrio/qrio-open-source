import { MongoClient, ObjectId } from 'mongodb';
import MainNavigation from '../../../MainNavigation';
import EvidenceGrid from './EvidenceGrid';
import EvidenceForm from './EvidenceForm';
import classes from './claimpage.module.css'
import { useState, useEffect } from 'react';
import { getSession } from "@auth0/nextjs-auth0";

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

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  const { params } = context;
  const user = session?.user || null;

  const client = await MongoClient.connect('mongodb+srv://nextjsuser:RD2kvgKHiqNN5Fz6G7WwuB8o@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const claimsCollection = db.collection('claims');
  const claim = await claimsCollection.findOne({ _id: new ObjectId(params.claimId) });

  client.close();

  return {
    props: {
      user: user,
      claim: JSON.parse(JSON.stringify(claim)),
    },
  };
}

export default function ClaimPage({ claim, user }) {
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    fetchEvidence(claim._id).then(evidenceData => {
      setEvidence(evidenceData);
      console.log(evidenceData);  // Log the fetched evidence
    });
  }, [claim._id]);

  const refetchEvidence = () => {
    fetchEvidence(claim._id).then(evidenceData => {
      setEvidence(evidenceData);
      console.log(evidenceData);  // Log the fetched evidence
    });
  };

  return (
    <div>
      <MainNavigation></MainNavigation>
      <img className={classes.claimImage} src={claim.image} alt={claim.title} />
      <h1 className={classes.claimtitle}>{claim.title}</h1>
      <p className={classes.claimdescriptionp}>{claim.description}</p>
      <EvidenceGrid evidence={evidence} user={user}></EvidenceGrid>
      <EvidenceForm claimId={claim._id} onEvidenceSubmit={refetchEvidence}></EvidenceForm>
    </div>
  );
}
