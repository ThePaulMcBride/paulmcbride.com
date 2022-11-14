import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const result = await fetch(
    "https://api.convertkit.com/v3/forms/1390545/subscribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        api_key: process.env.CONVERTKIT_API_KEY,
      }),
    }
  );
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: data.message });
  }

  return res.status(201).json({ error: "" });
}
