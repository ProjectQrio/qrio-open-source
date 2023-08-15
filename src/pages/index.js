import Head from "next/head";
import styles from "@/styles/Home.module.css";
import MainNavigation from "../../MainNavigation.js";
import ClaimsGrid from "../components/home-page/ClaimsGrid.js";
import { MongoClient } from "mongodb";
import { useEffect, useRef } from 'react'; // Imported useRef

export default function HomePage({ claims }) {
  // Replace hasFetched state with a useRef
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch('/api/session');
      const data = await response.json();

      // Check if the API call was already made
      if (data && data.user && !hasCalledAPI.current) {
        const userId = data.user.sub;

        fetch('/api/checkUserLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId })
        });

        // Set hasCalledAPI to true after making the fetch call
        hasCalledAPI.current = true;
      }
    };

    fetchSession();
  }, []); // Removed hasFetched from the dependency array

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
  const client = await MongoClient.connect("mongodb+srv://readuser:m2fYMhAwsrBb0c2iEq21fhx3@cluster0.ituqmyx.mongodb.net/?retryWrites=true&w=majority");
  const db = client.db();

  const claimsCollection = db.collection("claims");

  const claims = await claimsCollection.find().toArray();

  client.close();

  return {
    props: {
      claims: claims.map(claim => ({
        title: claim.title,
        image: claim.image,
        id: claim._id.toString(),  // _id needs to be converted to string
      }))
    },
    revalidate: 1,  // optional, enables Incremental Static Regeneration
  };
}
