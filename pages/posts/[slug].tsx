import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = () => {
  const files = fs.readdirSync("data/posts");

  const posts = files.map((fileName) => {
    return fileName.replace(/\.md(x)?$/, "");
  });

  return {
    paths: posts.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const extension = fs.existsSync(`data/posts/${slug}.md`) ? "md" : "mdx";
  const readFile = fs.readFileSync(`data/posts/${slug}.${extension}`, "utf-8");
  const { data } = matter(readFile);

  return {
    props: {
      data,
    },
  };
};

const Post: NextPage = (props: any) => {
  return <h1>{props.data.title}</h1>;
};

export default Post;
