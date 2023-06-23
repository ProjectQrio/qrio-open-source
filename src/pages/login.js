import MainNavigation from "../components/MainNavigation.js";
import AuthForm from "../components/authentication/AuthForm.js";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function LoginSignInPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MainNavigation></MainNavigation>
      <AuthForm></AuthForm>
    </div>
  );
}

export default LoginSignInPage;
