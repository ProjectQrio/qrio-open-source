import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "../components/Header.js";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Qrio</title>
        <meta name="description" content="Be Qrios. Question Everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className={`${styles.main} ${inter.className}`}>
        

        <div className={styles.header}></div>

        <center>
          <h1>Collaborate in Crowdsourced Truth Finding</h1>
        </center>
        <center>
          <h2>Have Your Claim Investigated</h2>
          <p>
            There’s too much bad information to sort through and it’s easy to
            get caught in information bubbles. Use collective intelligence to
            gather the best information to address your most pressing questions
            about current events and more.
          </p>

          <Link href="/ClaimProductPage">
            <button className={styles.button}>Click Here</button>
          </Link>
        </center>
        <center>
          <h2>Have Your Solution Tested</h2>
          <p>
            So many attempted solutions end up creating new, and sometimes
            worse, problems because we didn’t think them through enough ahead of
            time. Use collective intelligence to get a solution idea tested
            before implementing it.
          </p>

          <Link href="/SolutionProductPage">
            <button className={styles.button}>Click Here</button>
          </Link>
        </center>
      </main>
    </>
  );
}
