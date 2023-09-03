import Head from "next/head";
import styles from "@/styles/Home.module.css";
import MainNavigation from "../../MainNavigation.js";
import ClaimsGrid from "../components/home-page/ClaimsGrid.js";
import { useEffect, useRef } from 'react';
import { connectToDatabase } from './api/database';
import EvidenceTicker from "@/components/home-page/EvidenceTicker.js";
import Footer from "@/components/Footer.js";

export default function HomePage({ claims }) {
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch('/api/session');
      const data = await response.json();
    
      if (data && data.user && !hasCalledAPI.current) {
        const userId = data.user.sub;
        const userName = data.user.name || data.user.nickname;
    
        fetch('/api/checkUserLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, userName })
        });
    
        hasCalledAPI.current = true;
      }
    };
    

    fetchSession();
  }, []);

  console.log("HomePage component rendered");

  return (
    <>
      <Head>
        <title>Project Qrio</title>
        <meta name="description" content="Be Qrios. Question Everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Qriofavicon.png" />
      </Head>

      <MainNavigation />

      <div className={styles.header}>

      <div className={styles.overlayContent}>
        <h1 className={styles.h1}>Collaborate in Crowdsourced Truth Seeking</h1><br />
        <p className={styles.underheaderDescriptionp}>
          Today we have access to more information than at any other time in history,
          <br></br><br></br>
          But it’s easy to get overwhelmed or caught in information bubbles. 
          <br></br><br></br>
          That's where Qrio comes in.
          <br></br><br></br>
          Join our community of curious truth-seekers to
          gather the best information to address your most pressing questions
          about current events and more.
          <br /> <br />
          Be Qrios. Question Everything.
        </p>
        <button 
    className={styles.getStartedButton} 
    onClick={() => window.location.href='/get-started'}>
  Get Started
</button>
      </div>
      </div>
<center>
        <h2>Latest Evidence</h2>
        <EvidenceTicker></EvidenceTicker>
<h2>Claims Under Investigation</h2>
        <ClaimsGrid claims={claims} />
        <br></br>
        <Footer />
      </center>
    </>
  );
}

export async function getStaticProps() {
  const { client, db } = await connectToDatabase();
  const claimsCollection = db.collection("claims");

  const claims = await claimsCollection.find().toArray();
  client.close();

  return {
    props: {
      claims: claims.map(claim => ({
        title: claim.title,
        image: claim.image,
        id: claim._id.toString(),
      }))
    },
    revalidate: 1,
  };
}
