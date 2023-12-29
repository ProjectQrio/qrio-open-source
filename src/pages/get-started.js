import MainNavigation from "../../MainNavigation.js";
import Footer from "@/components/Footer.js";
import styles from '@/styles/get-started.module.css';
import Link from "next/link.js";
import Head from 'next/head';



export default function GetStartedPage() {
    return (
      <>
      <Head>
      <title>Project Qrio</title>
      <meta property="og:title" content="Project Qrio" />
      <meta property="og:description" content="Qrio is a web tool that facilitates collaborative research. The design incentivizes nuanced, critical thinking and aims to help users escape their information bubbles to consider new perspectives. Be Qrios. Question Everything." />
      <meta property="og:image" content="ProjectQrioHeaderImage.png" />
    </Head>
      <div>
        <MainNavigation />
  
        <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.h1}>Welcome to Project Qrio!</h1>
          <div className={styles.textImageCombo}>
          <img className={styles.imgStacia} src="https://2ndlook.news/wp-content/uploads/2022/11/IMG_8251-e1669860045885.jpg" alt="Stacia at Desk" />
          <p className={styles.p}>Hey there! <br></br><br></br>
          I'm Stacia, the creator of Project Qrio. 
          <br></br><br></br>
          More information has been created in the last 100 years than in all of human history before that, but many of us have less confidence than ever that we know what's really going on. If that's you, then you're in the right place.
          <br></br><br></br>
Project Qrio is meant to provide simple, decentralized systems for people to work together to get closer to the truth.
          </p>
          </div>

          <h3 className={styles.h3}>This is a Prototype</h3>
          <p className={styles.p}>Please note that this is a very early version of the final app I want to create. This version is only built for desktop viewing. I want to know if it is useful, and if it is easy to use, as well as what features you would like to see added.
          <br></br><br></br>
          If you have any questions, feedback, ideas, or problems with the site, please don't hesitate to <a href="mailto:projectqrio@gmail.com" style={styles.link}>email me</a>.
          </p>

          <h3 className={styles.h3}>How to Use This Website</h3>
            <p className={styles.p}>The basic idea is that we are investigating specific topics (called 'claims') together. Each claim is a declarative statement, but don't assume the statement is true! Click on any claim on the homepage to see the page where the claim is being investigated. 
            <br></br><br></br>
            Each investigation page will have a title and a brief explanation of what is being investigated or why. There may already be evidence in the "For" or "Against" columns, or it may be blank. You can use the form at the bottom of each claim investigation page to add evidence "For" or "Against" each claim, and click on the "plus" sign to leave comments under evidence that other people have added. 
            
            <br></br><br></br>
            Comments should be directly related to the evidence you're commenting on. For example, if you have reason to believe the source is not credible or is missing some context, you can explain why.
            <br></br><br></br>
            Please stick to submitting evidence that is relevant to the claim, and please be respectful in your comments. For now, I will be moderating manually.
            <br></br><br></br>
            <Link href="/api/auth/login">Login</Link> with your Google account to get started.
            </p>

          <h3 className={styles.h3}>The Purpose of Project Qrio</h3>
          <div className={styles.textImageCombo}>
          <p className={styles.p}>
            Project Qrio aims to help people overcome information overload, and sort through all the misinformation, disinformation, and propaganda from official as well as unofficial sources.
            <br></br><br></br>
          It's based on the premise that everyone is inherently biased. We all have our own perspectives, our own life experiences, and it's impossible to account for what we don't know we don't know (see image). 
            <br></br><br></br>
            So that means we need to work together to overcome our own limitations if we want to get closer to the truth.
            <br></br><br></br>
           Project Qrio is all about empowering individuals with tools to make it easier to decide what they believe for themselves. It's not going to tell you what to think, rather, it is meant to give you more complete information to make up your own mind.
            <br></br><br></br>
            Qrio provides a simple system for people to gather and organize information together, and to sharpen each others' evidence with constructive critiques, so that we can be exposed to the strongest evidence for various positions.
            <br></br><br></br>
            In the future, I plan to add functionality that will help the best information rise to the top, as well as other systems for organizing and analyzing information. 
          </p>
          <img className={styles.imgRight} src="https://2ndlook.news/wp-content/uploads/2023/08/Shit-You-Dont-Know-You-Dont-Know.png" alt="Shit You Don't Know You Don't Know" />
</div>
            <h3 className={styles.h3}>Get Started</h3>
            <p className={styles.p}>Now, head back to the <Link href="/">home page</Link> to see the latest evidence that has been submitted, and a full list of claims that are currently under investigation. Click on any of the claims to go to the investigation page and see the evidence that has been submitted so far. To add evidence and comments, be sure to <Link href="/api/auth/login">create an account</Link> or <Link href="/api/auth/login">login</Link>.
          </p>
        </div>
  </div>
        <Footer />
      </div>
      </>
    );
  }
  

