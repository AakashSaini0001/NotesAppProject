import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User, { findOne } from "../models/User";

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    let user = await findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });
    user.password = await hash(password, 10);
    await user.save();

    const payload = { user: { id: user.id } };
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    let user = await findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch {
    res.status(500).send("Server error");
  }
}
