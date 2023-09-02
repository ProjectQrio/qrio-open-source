import MainNavigation from "../../MainNavigation.js";
import Footer from "@/components/Footer.js";
import styles from "@/styles/get-started.module.css";

export default function SupportPage() {
  return (
    <div>
      <MainNavigation />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.h1}>Having a Problem?</h1>

          <p className={styles.p}>
            <center>
              If you're having any issues with the site, please{" "}
              <a href="mailto:projectqrio@gmail.com" style={styles.link}>
                email me
              </a>{" "}
              and I'll get back to you as soon as possible.
            </center>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
