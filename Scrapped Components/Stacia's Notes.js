
////Scrapped User Profile with Authentication (because it would briefly flash the profile or loading before redirecting)


import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/login";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <center>
        <p>Loading...</p>
      </center>
    );
  }

  return (
    <div>
      <center>
        <h1>My profile</h1>
      </center>
    </div>
  );
}

export default UserProfile;



///attempt at the [...nextauth].js page using the Next Auth credentials documentation https://next-auth.js.org/configuration/providers/credentials

import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from 'next-auth';
import { verifyPassword } from '../../../../helpers/auth';
import { connectToDatabase } from '../../../../helpers/database';

export default NextAuth ({
    getServerSession: {
        jwt: true
    },
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
        identifier: { label: "Username or Email", type: "text", placeholder: "Your username or email" },
        password: { label: "Password", type: "password" }
      },
      
    async authorize(credentials, req) {

        const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');

                await usersCollection.findOne({ 
                    $or: [
                        { email: credentials.email }, 
                        { username: credentials.username }
                    ] 
                });
                
                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }


const isValid = await verifyPassword(credentials.password, user.password);

if (!isValid) {
    client.close();
    throw new Error('Could not log you in!');
}

client.close();
return { email: user.email };
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
]
}
);


///attempt at the [...nextauth].js page using the nextjs course and trying to upgrade to v4 on my own

import NextAuth from 'next-auth';
import { verifyPassword } from '../../../../helpers/auth';
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from '../../../../helpers/database';
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth ({
    getSession: {
        jwt: true
    },
     provider: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');

                await usersCollection.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }


const isValid = await verifyPassword(credentials.password, user.password);

if (!isValid) {
    client.close();
    throw new Error('Could not log you in!');
}

client.close();
return { email: user.email };
                

            }
        })
        ]
});



////Registration Form created by ChatGPT

import { useState } from 'react';
import { useRouter } from 'next/router';


const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [age, setAge] = useState('');

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    // Assuming you have a function `registerUser` to call your backend and register the user
    registerUser(username, email, password)
      .then(() => {
        setMessage('Thank you for registering!');
        // Assuming you have a function `loginUser` to login user after registration
        loginUser(username, password)
          .then(() => {
            router.push('/');  // Redirects the user to the homepage
          });
      });
  };

  return (
<div>
<br />
<br />
<br />
    <center>
    <form className="register-form" onSubmit={handleSubmit}>
    <h2 className="form-title">Register</h2> 
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>

      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      </label>

      <button type="submit">Register</button>
            {message && <p>{message}</p>}
    </form>
    </center>
    </div>
  );
};

export default RegistrationForm;




///Cut from global.css - it was a remnant of the code it started with

--callout-rgb: 238, 240, 241;
--callout-border-rgb: 172, 175, 176;
--card-rgb: 180, 185, 188;
--card-border-rgb: 131, 134, 135;

////Full code from cut "HomePageColumns" component

import Link from "next/link";
import styles from "@/styles/Home.module.css";


export default function HomePageColumns() {
  return (
    
<div className="grid-container">
  <div className="column">
  <center>
<h2>Have Your Claim Investigated</h2><br />
<p>
  There’s too much bad information to sort through and it’s easy to
  get caught in information bubbles. Use collective intelligence to
  gather the best information to address your most pressing questions
  about current events and more.
</p>
<br />
<Link href="/ClaimProductPage">
  <button className={styles.button}>Click Here</button>
</Link>
</center>

  </div>
  <div className="column">
  <center>
<h2>Have Your Solution Tested</h2><br />
<p>
  So many attempted solutions end up creating new, and sometimes
  worse, problems because we didn’t think them through enough ahead of
  time. Use collective intelligence to get a solution idea tested
  before implementing it.
</p>
<br />
<Link href="/SolutionProductPage">
  <button className={styles.button}>Click Here</button>
</Link>
</center>
  </div>
</div>


  );
}



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
