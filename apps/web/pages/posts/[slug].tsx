import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PostLayout from "layouts/Post";
import { client } from "lib/sanity";
import { PortableText } from "@portabletext/react";
import dynamic from "next/dynamic";
import groq from "groq";
import Image from "next/image";
import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import jsx from "refractor/lang/jsx";
import css from "refractor/lang/css";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
  loading: (props: any) => (
    <div className="!col-start-1 !col-end-4 mb-8 max-w-screen-lg w-full mx-auto rounded-lg">
      <div className="aspect-video">
        <iframe src={props.url} />
      </div>
    </div>
  ),
});

Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(css);

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.fetch(`*[_type == "post"]{slug}`);
  const paths: any[] = res.map((post: any) => `/posts/${post.slug.current}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const slug = params.slug;
  const [result] = await client.fetch(
    groq`*[_type == "post" && slug.current == "${slug}"] {
      slug,
      title,
      summary,
      'mainImage': mainImage.asset->,
      publishedAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      }
    }`
  );

  const post: any = {
    slug: `posts/${result.slug.current}`,
    title: result.title,
    banner: result.mainImage,
    description: result.summary,
    teaser: result.summary,
    body: result.body,
    estimatedReadingTime: result.estimatedReadingTime,
    publishedAt: result.publishedAt,
  };

  return {
    props: {
      post,
    },
  };
};

const components = {
  types: {
    image: (props: any) => {
      return (
        <Image
          className="!col-start-1 !col-end-4 max-w-screen-lg w-full mx-auto rounded-lg drop-shadow-xl"
          src={props.value.asset.url}
          alt={props.value.asset.altText}
          width={props.value.asset.metadata.dimensions.width}
          height={props.value.asset.metadata.dimensions.height}
        />
      );
    },
    code: (props: any) => {
      return (
        <Refractor
          className="rounded-lg [&_code]:bg-transparent"
          language={props.value.language}
          value={props.value.code}
          markers={props.value.highlightedLines}
        />
      );
    },
    youtube: (props: any) => {
      return (
        <div className="!col-start-1 !col-end-4 mb-8 max-w-screen-lg w-full mx-auto rounded-lg ">
          <ReactPlayer
            className="aspect-video"
            url={props.value.url}
            allow="accelerometer; picture-in-picture"
            allowFullScreen
            width="100%"
            height="100%"
          />
        </div>
      );
    },
    divider: () => {
      return <hr className="!my-12" />;
    },
  },
  block: {
    blockquote: (props: any) => {
      return (
        <blockquote className="border-l-0 ml-0 pl-0 text-5xl mb-16 !mt-16 before:content-[''] before:block before:mx-auto before:w-10 before:text-center before:border-t-2 after:content-[''] after:block after:mx-auto after:w-10 after:text-center after:border-b-2">
          <p className="text-gray-700 dark:text-gray-200 py-8 mb-0 mx-auto max-w-2xl text-center not-italic before:content-[''] after:content-['']">
            {props.children}
          </p>
        </blockquote>
      );
    },
  },
};

const Post: NextPage = (props: any) => {
  return (
    <PostLayout post={props.post}>
      <PortableText value={props.post.body} components={components} />
    </PostLayout>
  );
};

export default Post;
