import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import MainNavigation from "../components/MainNavigation.js";
import HomePageClaimsGrid from "../components/HomePageClaimsGrid.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Qrio</title>
        <meta name="description" content="Be Qrios. Question Everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Qriofavicon.png" />
      </Head>

      <MainNavigation></MainNavigation>

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

        <HomePageClaimsGrid></HomePageClaimsGrid>
      </center>
    </>
  );
}
