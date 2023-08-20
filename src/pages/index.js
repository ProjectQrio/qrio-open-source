import Head from "next/head";
import styles from "@/styles/Home.module.css";
import MainNavigation from "../../MainNavigation.js";
import ClaimsGrid from "../components/home-page/ClaimsGrid.js";
import { useEffect, useRef } from 'react';
import { connectToDatabase } from '../api/database';  // Import the function from database.js

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

      <div className={styles.header}></div>

      <center>
        <h1>Collaborate in Crowdsourced Truth Finding</h1><br /> <br />
        <p className={styles.underheaderDescriptionp}>
          There’s too much bad information to sort through and it’s easy to
          get caught in information bubbles. Join with a community of curious truth-seekers to
          gather the best information to address your most pressing questions
          about current events and more.
          <br /> <br />
          Be Qrios. Question Everything.
        </p>

        <ClaimsGrid claims={claims} />
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
