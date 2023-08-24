import React from 'react';
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function MainNavigation() {
  const { user, isLoading } = useUser()
  
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <img
            src="/qrioheaderlogo.png"
            alt="Your logo"
            className={classes.logo}
            width={200}
            height={55}
          />
        </Link>
      </div>
      <div className={classes.linkscontainer}>
        <Link href="/">Home</Link>
        {!isLoading && (user ? (
            <>
            <Link href="/get-started">
              About
            </Link>
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
