import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import MainNavigation from "../../MainNavigation.js";
import styles from "../styles/profile.module.css";


export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
      user && (
        <div>
          <div>
                    <MainNavigation />
            </div>
            <div className={styles.profileContainer}>
            <img className={styles.profileImage} src={user.picture} alt={user.name} />
            <h2 className={styles.profileName}>{user.name}</h2>
            <p className={styles.profileInfo}>{user.email}</p>
          </div></div>
      )
  );
}