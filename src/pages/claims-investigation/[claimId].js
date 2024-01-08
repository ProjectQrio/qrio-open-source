import { ObjectId } from 'mongodb';
import MainNavigation from '../../../MainNavigation';
import EvidenceGrid from '../../components/evidence-and-comments/EvidenceGrid';
import EvidenceForm from '../../components/evidence-and-comments/EvidenceForm';
import classes from './claimpage.module.css'
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../api/database'; 
import Footer from '../../components/Footer'
import PercentageSlider from '@/components/PercentageSlider';
import { Tooltip } from 'antd';
import Head from 'next/head';


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


  return {
    paths: claims.map((claim) => ({ params: { claimId: claim._id.toString() } })),
    fallback: 'blocking',
  };
}

export default function ClaimPage({ claim }) {
  const [evidence, setEvidence] = useState([]);
  const [comments, setComments] = useState({});
  const [showDescription, setShowDescription] = useState(false);

const toggleDescription = () => {
  setShowDescription(prevState => !prevState);
};


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
    <>
    <Head>
      <title>{claim.title}</title>
      <meta property="og:title" content={claim.title} />
      <meta property="og:description" content={claim.description} />
      <meta property="og:image" content={claim.image} />
      <meta name="robots" content="noai, noimageai" />
    </Head>
    <div>
      <MainNavigation></MainNavigation>
      <img className={classes.claimImage} src={claim.image} alt={claim.title} />
      <h1 className={classes.claimtitle}>{claim.title}</h1>
      <p className={classes.seeMore} onClick={toggleDescription} style={{cursor: 'pointer'}}>
        See more explanation about claim
      </p>
      {showDescription && <p className={classes.claimdescriptionp}>{claim.description}</p>}   
  
      <Tooltip title="We can never be 100% sure if a claim is true or false. So the likelihood of truth can be measured as a percentage. Use the slider to mark how likely you think it is that the claim is true or false. Feel free to adjust your probability as more evidence gets added and your views change over time.">
      <span className={classes.percentagesliderlabel}>Probability Slider</span>
   
      
     
      <PercentageSlider claimId={claim._id} />
      </Tooltip>
      <EvidenceGrid evidence={evidence} refetchEvidence={refetchEvidence} claimId={claim._id} />
      <EvidenceForm claimId={claim._id} onEvidenceSubmit={refetchEvidence}></EvidenceForm>
      <Footer />
    </div>
    </>
  );
}
