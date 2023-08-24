import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import ReactGA from "react-ga";

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize("G-HBW52341QW");
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
