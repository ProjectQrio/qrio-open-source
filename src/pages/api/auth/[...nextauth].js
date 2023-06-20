import NextAuth from "next-auth";
import { verifyPassword } from "../../../../helpers/auth";
import { connectToDatabase } from "../../../../helpers/database";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  getSession: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
