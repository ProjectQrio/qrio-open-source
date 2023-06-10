import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <Link href="/">
                    <img
                        src="/qrioheaderlogo.png"
                        alt="Your logo"
                        className="logo-container"
                        width={200}
                        height={55}
                    />
                </Link>
            </div>

            <div className="links-container">
                <Link href="/">Home</Link>
                <Link href="/">Log In</Link>
                <Link href="/">Register</Link>
            </div>
        </header>
    );
}
