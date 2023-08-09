import { getSession } from "@auth0/nextjs-auth0";

export default async function session(req, res) {
  const session = await getSession(req, res);
  res.status(200).json(session);
}