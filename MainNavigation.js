import Link from "next/link";
import classes from "./MainNavigation.module.css";


export default function MainNavigation() {

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
                <a href="/api/auth/login">Login</a>
                <Link href="/login">Register</Link>
                <Link href="/profile">Profile</Link>
                <a href="/api/auth/logout">Logout</a>
            </div>
        </header>
    );
}