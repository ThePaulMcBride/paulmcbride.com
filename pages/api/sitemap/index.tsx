import sitemap from "express-sitemap";
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getAllNoteSummaries,
  getAllPosts,
  getNotePageCursors,
} from "lib/dataApi";

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
      "/notes": [],
      "/now": [],
      "/colophon": [],
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
      "/notes": {
        changefreq: "daily",
        priority: 0.9,
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

  const [posts, notes, notePageCursors] = await Promise.all([
    getAllPosts(),
    getAllNoteSummaries(),
    getNotePageCursors(),
  ]);

  posts.forEach((post) => {
    config.map[post.href] = [];
    config.route[post.href] = {
      lastmod: format(parse(post.date), "yyyy-MM-dd"),
      changefreq: "monthly",
      priority: 0.7,
    };
  });

  const tags = new Set(posts.flatMap((post) => post.tags || []));

  tags.forEach((tag) => {
    const href = `/tags/${tag}`;

    config.map[href] = [];
    config.route[href] = {
      changefreq: "weekly",
      priority: 0.6,
    };
  });

  notes.forEach((note) => {
    config.map[note.href] = [];
    config.route[note.href] = {
      lastmod: format(parse(note.date), "yyyy-MM-dd"),
      changefreq: "monthly",
      priority: 0.5,
    };
  });

  notePageCursors.forEach((cursor) => {
    const href = `/notes/after/${cursor}`;

    config.map[href] = [];
    config.route[href] = {
      changefreq: "daily",
      priority: 0.6,
    };
  });

  return sitemap(config);
}
