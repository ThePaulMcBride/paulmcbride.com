import { NextApiRequest, NextApiResponse } from "next";
import { buildFeed } from "lib/feed";

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const feed = await buildFeed();

  res.statusCode = 200;
  res.setHeader("content-type", "application/rss+xml");
  res.end(feed.rss2());
}

export default handle;
