import Head from "next/head";
import DemoEmbed from "@/components/DemoVideo";
import Footer from "@/components/Footer.js";
import styles from "@/styles/Index.module.css";
import MainNavigation from "../../MainNavigation.js";
import ClaimsGrid from "../components/home-page/ClaimsGrid.js";
import { useEffect, useRef } from 'react';
import { connectToDatabase } from './api/database';
import EvidenceTicker from "@/components/home-page/EvidenceTicker.js";
import CommentsTicker from "@/components/home-page/CommentsTicker.js";

export default function Home({ claims }) {
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
  <meta property="og:title" content="Project Qrio" />
  <meta property="og:description" content="Qrio is a web tool that facilitates collaborative research. The design incentivizes nuanced, critical thinking and aims to help users escape their information bubbles to consider new perspectives. Be Qrios. Question Everything." />
  <meta property="og:image" content="ProjectQrioHeaderImage.png" />
</Head>

   <MainNavigation />
<center>
        <h2 className={styles.h2}>Claims Under Investigation</h2>
        <ClaimsGrid claims={claims} />
        <h2 className={styles.h2}>Demo</h2>
        <DemoEmbed></DemoEmbed><br></br><br></br>
        <div className={styles.tickerGrid}>
    <h2 className={styles.h2}>Latest Evidence</h2>
                <h2 className={styles.h2}>Latest Comments</h2>
                <EvidenceTicker></EvidenceTicker>
                <CommentsTicker></CommentsTicker>
                </div>
        <Footer />
      </center>
    </>
  );
}

export async function getStaticProps() {
  const { client, db } = await connectToDatabase();
  const claimsCollection = db.collection("claims");

  const claims = await claimsCollection.find().sort({ timestamp: -1 }).toArray();
  

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