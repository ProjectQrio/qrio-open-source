import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import classes from "./MainNavigation.module.css";


export default function MainNavigation() {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    

    console.log(loading);
    console.log(session);


    function logoutHandler(e) {
        e.preventDefault();
        signOut();
    }

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
                {!session && !loading && (<Link href="/login">Log In</Link>)}
                {!session && !loading && (<Link href="/login">Register</Link>)}
                {session && (<Link href="/profile">Profile</Link>)}
                {session && (<a className={classes.logoutbutton} onClick={logoutHandler}>Logout</a>)}
            </div>
        </header>
    );
}
