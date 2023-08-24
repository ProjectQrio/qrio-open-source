import MainNavigation from "../../MainNavigation.js";
import Footer from "@/components/Footer.js";
import styles from '@/styles/get-started.module.css';
import Link from "next/link.js";



export default function GetStartedPage() {
    return (
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
          The idea came out of a peer reviewed news publication I founded called <Link href="https://2ndlook.news">2ndLook News</Link>. A major challenge we ran into with 2ndLook News was that putting in the work to publish nuanced content in a top-down fashion was extremely expensive and time consuming. I also think people are more inclined to read social media-sized snippets more than long form articles.
          <br></br><br></br>
          That's why Project Qrio aims to be a more decentralized method for achieving the same goals.</p>
          </div>
          <h3 className={styles.h3}>The Purpose of Project Qrio</h3>
          <div className={styles.textImageCombo}>
          <p className={styles.p}>
            Project Qrio is based on the premise that everyone is inherently biased. We all come from our own perspectives, with our own life experience, and none of us know what we don't know. So that means we need to work together if we want to get as close to the truth as possible.
            <br></br><br></br>
            That said, Project Qrio is all about individuals deciding what they believe for themselves, and makes no attempt to decide what peoples' conclusions should be.
            <br></br><br></br>
            Instead, we provide a simple system for people to gather and organize information together, and to sharpen each others' evidence with constructive critique, so that we can be exposed to the strongest evidence for various positions and then come to our own conclusions.
            <br></br><br></br>
            In the future, we have plans to add functionality that will help the best information rise to the top.
          </p>
          <img className={styles.imgRight} src="https://2ndlook.news/wp-content/uploads/2023/08/Shit-You-Dont-Know-You-Dont-Know.png" alt="Shit You Don't Know You Don't Know" />
</div>
          <h3 className={styles.h3}>This is an Early Version</h3>
          <p className={styles.p}>Please note that this is a very early version of the app. We still have a lot of functionality we plan to add. This version is only built for desktop viewing, and I'll admit it's not very pretty. The purpose of putting it out there for a select group to start using is to get feedback on the core functionality of the app. We want to know if it is useful, and if it is easy to use. We also want to know what features you would like to see added.
          <br></br><br></br>
          If you have any questions, feedback, ideas, or problems with the site, please don't hesitate to <a href="mailto:projectqrio@gmail.com" style={styles.link}>email me</a>.
          </p>
          <h3 className={styles.h3}>How to Use This Website</h3>
            <p className={styles.p}>The basic idea is that we are investigating claims together. Each claim is a declarative statement that is under investigation. You can use the form at the bottom of each claim investigation page to add evidence "For" or "Against" each claim, and click the "plus" sign to leave comments under pieces of evidence that other people have left.
            <br></br><br></br>
            Please stick to submitting evidence that is relevant to the claim, and please be respectful in your comments. For now, I will be manually moderating and will be adding more systemic quality controls in the future.
            </p>
            <h3 className={styles.h3}>Get Started</h3>
            <p className={styles.p}>Now, head back to the <Link href="/">home page</Link> to see the latest evidence that has been submitted, and a full list of claims that are currently under investigation. Click on any of the claims to go to the investigation page for that claim and see the evidence that has been submitted so far. To add evidence and comments, be sure to <Link href="/api/auth/login">create an account</Link> or <Link href="/api/auth/login">login</Link>.
          </p>
        </div>
  </div>
        <Footer />
      </div>
    );
  }
  

