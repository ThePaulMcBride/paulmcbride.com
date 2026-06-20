import { Feed } from "feed";
import { isValid, parseISO } from "date-fns";
import { dataAssetUrl, getAllPosts, getPost } from "lib/dataApi";
import { renderMarkdownHtml } from "lib/markdownToHtml";

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

  const postSummaries = await getAllPosts();
  const posts = await Promise.all(
    postSummaries.map((post) => getPost(post.slug))
  );

  for (const post of posts) {
    const postUrl = `https://paulmcbride.com${post.href}`;
    const content = await renderMarkdownHtml(post.body, {
      absolutizeInternalLinks: true,
      renderYouTubeAsLink: true,
    });

    feed.addItem({
      title: post.title,
      id: post.href,
      link: postUrl,
      description: post.description,
      content: `${content}<div style="margin-top: 50px; font-style: italic;"><strong><a href="${postUrl}">Read on the website</a>.</strong></div>`,
      author: [author],
      date: parseISO(validDate(post.lastUpdated) || post.date),
      image: dataAssetUrl(post.banner),
    });
  }

  feed.addContributor(author);

  return feed;
};
