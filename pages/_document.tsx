import { Html, Head, Main, NextScript } from "next/document";

const schemaOrgJSONLD = [
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url: "https://paulmcbride.com",
    name: "Paul McBride – Developer, nerd, tech enthusiast.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    email: "hello@paulmcbride.net",
    image: "https://paulmcbride.com/avatar.jpeg",
    jobTitle: "Senior Software Engineer",
    name: "Paul McBride",
    birthPlace: "Newtownards, Northern Ireland",
    birthDate: "1991-12-24",
    gender: "male",
    nationality: ["Irish", "British"],
    url: "https://paulmcbride.com",
    sameAs: [
      "https://twitter.com/thepaulmcbride",
      "https://github.com/thepaulmcbride",
      "https://www.linkedin.com/in/thepaulmcbride/",
    ],
  },
];

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        <link
          href="/static/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/static/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <link
          key="rss-feed"
          rel="alternative"
          type="application/rss+xml"
          title="RSS feed for paulmcbride.com"
          href="/feed"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify(schemaOrgJSONLD)}`,
          }}
        />
      </Head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
