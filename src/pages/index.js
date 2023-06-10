import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "../components/Header.js";
import HomePageColumns from "../components/HomePageColumns.js";


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

      <Header></Header>

      <main className={`${styles.main} ${inter.className}`}>
        

        <div className={styles.header}></div>

        <center>
          <h1>Collaborate in Crowdsourced Truth Finding</h1>
        </center>

<HomePageColumns></HomePageColumns>


    
      </main>
    </>
  );
}
