import { hashPassword } from "../../../../helpers/auth";
import { connectToDatabase } from "../../../../helpers/database";
import dayjs from "dayjs";

const customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { username, email, password, dob } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  if (!dayjs(dob, "YYYY-MM-DD", true).isValid()) {
    return res
      .status(400)
      .json({ message: "Invalid date of birth. Format must be mm/dd/yyyy" });
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    username: username,
    email: email,
    password: hashedPassword,
    dob: dob,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
