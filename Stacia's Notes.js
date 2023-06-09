////Original logo and text Cut from index.js

<div className={styles.description}>
          <p>Collaborate in Crowdsourced Truth Finding</p>
          <div>
            <Image
              src="/qrioheaderlogo.png"
              alt="Qrio Logo"
              className={styles.vercelLogo}
              width={130}
              height={35}
              priority
            />
          </div>
        </div>



////Cut CSS from original global.css





--background-start-rgb: 214, 219, 220;
--background-end-rgb: 255, 255, 255;



--primary-glow: conic-gradient(
  from 180deg at 50% 50%,
  #16abff33 0deg,
  #0885ff33 55deg,
  #54d6ff33 120deg,
  #0071ff33 160deg,
  transparent 360deg
);
--secondary-glow: radial-gradient(
  rgba(255, 255, 255, 1),
  rgba(255, 255, 255, 0)
);



--tile-start-rgb: 239, 245, 249;
--tile-end-rgb: 228, 232, 233;
--tile-border: conic-gradient(
  #00000080,
  #00000040,
  #00000030,
  #00000020,
  #00000010,
  #00000010,
  #00000080
);

//Cut CSS from original Home.module.css

.description {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  font-size: 0.85rem;
  max-width: var(--max-width);
  width: 100%;
  z-index: 2;
  font-family: var(--font-mono);
}

.description a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.description p {
  position: relative;
  margin: 0;
  padding: 1rem;
  background-color: rgba(var(--callout-rgb), 0.5);
  border: 1px solid rgba(var(--callout-border-rgb), 0.3);
  border-radius: var(--border-radius);
}

.code {
  font-weight: 700;
  font-family: var(--font-mono);
}

.card {
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius);
  background: rgba(var(--card-rgb), 0);
  border: 1px solid rgba(var(--card-border-rgb), 0);
  transition: background 200ms, border 200ms;
}

.card span {
  display: inline-block;
  transition: transform 200ms;
}

.card h2 {
  font-weight: 600;
  margin-bottom: 0.7rem;
}

.card p {
  margin: 0;
  opacity: 0.6;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 30ch;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 4rem 0;
}

.center::before {
  background: var(--secondary-glow);
  border-radius: 50%;
  width: 480px;
  height: 360px;
  margin-left: -400px;
}

.center::after {
  background: var(--primary-glow);
  width: 240px;
  height: 180px;
  z-index: -1;
}

.center::before,
.center::after {
  content: '';
  left: 50%;
  position: absolute;
  filter: blur(45px);
  transform: translateZ(0);
}


.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(25%, auto));
  width: var(--max-width);
  max-width: 100%;
}



.logo {
  position: relative;
}
/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    background: rgba(var(--card-rgb), 0.1);
    border: 1px solid rgba(var(--card-border-rgb), 0.15);
  }

  .card:hover span {
    transform: translateX(4px);
  }
}

@media (prefers-reduced-motion) {
  .card:hover span {
    transform: none;
  }
}











///////////////




import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Qrio</title>
        <meta name="description" content="Be Qrios. Question Everything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
          Collaborate in Crowdsourced Truth Finding
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/qrioheaderlogo.png"
                alt="Qrio Logo"
                className={styles.vercelLogo}
                width={130}
                height={35}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
