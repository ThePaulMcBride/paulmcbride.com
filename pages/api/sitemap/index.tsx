import sitemap from "express-sitemap";
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import { NextApiRequest, NextApiResponse } from "next";
import { allPosts, Post } from "contentlayer/generated";

const handle = async function (req: NextApiRequest, res: NextApiResponse) {
  const sitemap = await load();

  res.status(200);
  res.setHeader("content-type", "application/xml");
  res.end(sitemap.xml());
};

export default handle;

async function load() {
  const config: any = {
    http: "https",
    url: "paulmcbride.com",
    map: {
      "/": [],
      "/posts": [],
    },
    route: {
      "/": {
        changefreq: "monthly",
        priority: 1.0,
      },
      "/posts": {
        changefreq: "weekly",
        priority: 1.0,
      },
      "/now": {
        changefreq: "monthly",
        priority: 1.0,
      },
      "/colophon": {
        changefreq: "monthly",
        priority: 1.0,
      },
    },
  };

  const posts = allPosts;

  posts
    .filter((post) => !post.draft)
    .forEach((post: Post) => {
      config.map[post.slug] = [];
      config.route[post.slug] = {
        lastmod: format(parse(post.date), "yyyy-MM-dd"),
        changefreq: "monthly",
        priority: 0.7,
      };
    });

  return sitemap(config);
}
