import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "lib/feed";

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const feed = await buildFeed();

  res.statusCode = 200;
  res.setHeader("content-type", "application/xml");
  res.end(feed.atom1());
}

export default handle;
