import React from 'react';
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export default function MainNavigation() {
  const { user, isLoading } = useUser()
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <img
            src="/QrioLogoCollaborativeSensemaking.png"
            alt="Your logo"
            className={classes.logo}
            width={200}
            height={55}
          />
        </Link>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className={classes.hamburger}>
        ☰
      </button>
      <div className={`${classes.linkscontainer} ${isOpen ? classes.open : ''}`}>
        <Link href="/">Home</Link>
        <Link href="https://bit.ly/suggest-claim">
              Suggest a Claim
            </Link>
        <Link href="/get-started">
              About
            </Link>
        {!isLoading && (user ? (
            <>
            <Link href="/profile">
              Profile
            </Link>
            <Link href="/api/auth/logout">
              Logout
            </Link>
            </>
        ) : (
            <Link href="/api/auth/login">
              Login
            </Link>
        ))}
      </div>
    </header>
  );
}