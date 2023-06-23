
import MainNavigation from "../components/MainNavigation.js";
import UserProfile from "@/components/profile/user-profile.js";
import { getSession } from "next-auth/react";


function ProfilePage() {

  return (
    <div>
      <MainNavigation></MainNavigation>
    <UserProfile></UserProfile>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({req: context.req});

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}


export default ProfilePage;