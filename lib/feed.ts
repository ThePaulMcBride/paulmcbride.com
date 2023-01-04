import { Feed } from "feed";
import { allNowPosts, allPosts } from "contentlayer/generated";
import { parseISO } from "date-fns";

const author = {
  name: "Paul McBride",
  email: "hello@paulmcbride.com",
  link: "https://paulmcbride.com",
};

export const buildFeed = async () => {
  const feed = new Feed({
    title: "PaulMcBride.com",
    description: "The tech ramblings of Paul McBride",
    id: "https://paulmcbride.com/",
    link: "https://paulmcbride.com/",
    language: "en-GB",
    image: "https://paulmcbride.com/static/banner.jpeg",
    favicon: "https://paulmcbride.com/static/favicons/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Paul McBride`,
    feedLinks: {
      json: "https://paulmcbride.com/json",
      atom: "https://paulmcbride.com/atom",
    },
    author,
  });

  allPosts
    .filter((post) => !post.draft)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: post.slug,
        link: `https://paulmcbride.com${post.slug}`,
        description: post.description,
        content: `<p>${post.teaser}</p><div style="margin-top: 50px; font-style: italic;"> <strong><a href="https://paulmcbride.com${post.slug}">Keep reading</a>.</strong> </div> <br /> <br />`,
        author: [author],
        date: parseISO(post.date),
        image: `https://paulmcbride.com${post.banner}`,
      });
    });

  // allNowPosts.forEach((post) => {
  //   feed.addItem({
  //     title: post.title,
  //     id: post._id,
  //     link: `https://paulmcbride.com/now`,
  //     description: post.title,
  //     content: `${post.body.code}`,
  //     author: [author],
  //     date: parseISO(post.date),
  //   });
  // });

  feed.addContributor(author);

  return feed;
};
