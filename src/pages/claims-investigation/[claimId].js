import { ObjectId } from 'mongodb';
import MainNavigation from '../../../MainNavigation';
import EvidenceGrid from '../../components/evidence-and-comments/EvidenceGrid';
import EvidenceForm from '../../components/evidence-and-comments/EvidenceForm';
import classes from './claimpage.module.css'
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../api/database'; 

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

export async function getStaticProps(context) {
  const { params } = context;

  const { client, db } = await connectToDatabase();
  const claimsCollection = db.collection('claims');

  const claim = await claimsCollection.findOne({ _id: new ObjectId(params.claimId) });
  client.close();

  return {
    props: {
      claim: JSON.parse(JSON.stringify(claim)), 
    },
  };
}

export async function getStaticPaths() {
  const { client, db } = await connectToDatabase();
  const claimsCollection = db.collection('claims');

  const claims = await claimsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: claims.map((claim) => ({ params: { claimId: claim._id.toString() } })),
    fallback: 'blocking',
  };
}

export default function ClaimPage({ claim }) {
  const [evidence, setEvidence] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchEvidence(claim._id).then(evidenceData => {
      setEvidence(evidenceData);
      console.log(evidenceData);
    });
  }, [claim._id]);

  const refetchEvidence = () => {
    fetchEvidence(claim._id).then(evidenceData => {
      setEvidence(evidenceData);
      console.log(evidenceData);
    });
  };

  return (
    <div>
      <MainNavigation></MainNavigation>
      <img className={classes.claimImage} src={claim.image} alt={claim.title} />
      <h1 className={classes.claimtitle}>{claim.title}</h1>
      <p className={classes.claimdescriptionp}>{claim.description}</p>
      <EvidenceGrid evidence={evidence} refetchEvidence={refetchEvidence} claimId={claim._id} />
      <EvidenceForm claimId={claim._id} onEvidenceSubmit={refetchEvidence}></EvidenceForm>
    </div>
  );
}
