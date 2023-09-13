import Head from "next/head";
import styles from "@/styles/Index.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Landing() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If there's a user session and loading is finished, redirect to /home
    if (!isLoading && user) {
      router.push('/home');
    }
  }, [user, isLoading]);

  // Your landing page content
  return (
       <>
      <Head>
        <title>Project Qrio</title>
        <meta name="description" content="Be Qrios. Question Everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Qriofavicon.png" />
      </Head>
      <div className={styles.header}>
        <div className={styles.overlayContent}>
          <h1 className={styles.h1}>Collaborate in Crowdsourced Truth Seeking</h1>
          <p className={styles.underheaderDescriptionp}>
            Today we have access to more information than at any other time in history.
            </p>
            <p className={styles.underheaderDescriptionp}>
            But it’s easy to get overwhelmed or caught in information bubbles.
            </p>
            <p className={styles.underheaderDescriptionp}> 
            That's where Qrio comes in.
            </p>
            <p className={styles.underheaderDescriptionp}>
            Join our community of curious truth-seekers to
            find answers to your most pressing questions
            about current events and more.
            </p>
            <p className={styles.underheaderDescriptionp}>
            Be Qrios. Question Everything.
          </p>
          <button 
            className={styles.howButton} 
            onClick={() => scrollToSection('how-it-works-section')}>How it Works
          </button>
          <button 
            className={styles.loginButton} 
            onClick={() => router.push('/api/auth/login')}>
           Login
          </button>
        </div>
      </div>
      <div id="how-it-works-section">
        <h2 className={styles.h2}>How It Works</h2>
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
</div>

    </>
  );
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}