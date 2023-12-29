import Head from "next/head";
import styles from "@/styles/Index.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import DemoEmbed from "@/components/DemoVideo";
import Footer from "@/components/Footer.js";

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
        <meta property="og:title" content="Project Qrio" />
        <meta property="og:description" content="Qrio is a web tool that facilitates collaborative research. The design incentivizes nuanced, critical thinking and aims to help users escape their information bubbles to consider new perspectives. Be Qrios. Question Everything." />
        <meta property="og:image" content="ProjectQrioHeaderImage.png" />
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
          <div className={styles.buttonsDiv}>
            <button 
              className={styles.howButton} 
              onClick={() => scrollToSection('how-it-works-section')}>How it Works
            </button>
            <button 
              className={styles.loginButton} 
              onClick={() => router.push('/api/auth/login')}>
             Go to Site
            </button>
          </div>
        </div>
      </div>
      <div id="how-it-works-section">
        <h2 className={styles.h2}>How It Works</h2>
        <DemoEmbed></DemoEmbed>
        <br></br>  <br></br>
        <h3 className={styles.h2}>This is a Prototype</h3>
          <p className={styles.p}>Please note that this is an early version of the final app I want to create. This version is only built for desktop viewing and has no built-in quality control features, so please use it as-intended. I'll be doing manual moderation if needed. That said, I really hope you'll use it! I'm looking for feedback on whether it is useful, if it is easy to use, and what features you would like to see added. It's important at this point to get users actively using it, so please don't hesitate to input evidence, leave comments, and share the site with friends who might be interested.
          <br></br><br></br>
          If you have any questions, feedback, ideas, or problems with the site, please don't hesitate to <a href="mailto:projectqrio@gmail.com" style={styles.link}>email me</a>.
          </p>
      </div><div>
      <p className={styles.p}>
            <Link href="/api/auth/login">Login</Link> with your Google account to get started.
            </p>
</div>
<Footer />

    </>
  );
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}