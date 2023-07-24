import Head from "next/head";
import styles from "@/styles/Home.module.css";
import MainNavigation from "../components/MainNavigation.js";
import ClaimsGrid from "../components/home-page/ClaimsGrid.js";
import { MongoClient } from "mongodb";
import Link from "next/link";
import Image from "next/image";



export default function HomePage({ claims }) {
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
