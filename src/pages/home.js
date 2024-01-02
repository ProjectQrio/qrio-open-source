import styles from "@/styles/Home.module.css";
import MainNavigation from "../../MainNavigation.js";
import ClaimsGrid from "../components/home-page/ClaimsGrid.js";
import { useEffect, useRef } from 'react';
import { connectToDatabase } from './api/database';
import EvidenceTicker from "@/components/home-page/EvidenceTicker.js";
import CommentsTicker from "@/components/home-page/CommentsTicker.js";
import Footer from "@/components/Footer.js";
import DemoEmbed from "@/components/DemoVideo.js";

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
   <MainNavigation />
<center>
<h2 className={styles.h2}>Demo</h2>
        <DemoEmbed></DemoEmbed>
        <h2 className={styles.h2}>Claims Under Investigation</h2>
        <ClaimsGrid claims={claims} />
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
