import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
     <Link href="/">
      <div className="logo-container">
        <img
          src="/qrioheaderlogo.png"
          alt="Your logo"
          className="logo-container"
          width={200}
          height={55}
        />
      </div>
      </Link>

      <Link href="/">Home</Link>

      <Link href="/">Log In</Link>

      <Link href="/">Register</Link>
    </header>
  );
}
