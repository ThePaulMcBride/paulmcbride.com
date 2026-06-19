import { Feed } from "feed";
import { isValid, parseISO } from "date-fns";
import { dataAssetUrl, getAllPosts } from "lib/dataApi";

const author = {
  name: "Paul McBride",
  email: "hello@paulmcbride.com",
  link: "https://paulmcbride.com",
};

function validDate(value: string | undefined) {
  if (!value || !isValid(parseISO(value))) return undefined;

  return value;
}

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

  const posts = await getAllPosts();

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.href,
      link: `https://paulmcbride.com${post.href}`,
      description: post.description,
      content: `<p>${post.teaser}</p><div style="margin-top: 50px; font-style: italic;"> <strong><a href="https://paulmcbride.com${post.href}">Keep reading</a>.</strong> </div> <br /> <br />`,
      author: [author],
      date: parseISO(validDate(post.lastUpdated) || post.date),
      image: dataAssetUrl(post.banner),
    });
  });

  feed.addContributor(author);

  return feed;
};
