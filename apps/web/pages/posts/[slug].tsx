import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "components/MDXComponents";
import PostLayout from "layouts/Post";
import { client } from "lib/sanity";
import { PortableText } from "@portabletext/react";
import groq from "groq";
import Image from "next/image";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.fetch(`*[_type == "post"]{slug}`);
  const paths: any[] = res.map((post: any) => `/posts/${post.slug.current}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // const post: Post = allPosts.find((post) => {
  //   return post._raw.flattenedPath.replace("posts/", "") === params.slug;
  // }) as Post;
  const slug = params.slug;

  const [result] = await client.fetch(
    groq`*[_type == "post" && slug.current == "${slug}"]{
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
          src={props.value.asset.url}
          alt={props.value.asset.altText}
          width={props.value.asset.metadata.dimensions.width}
          height={props.value.asset.metadata.dimensions.height}
        />
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
