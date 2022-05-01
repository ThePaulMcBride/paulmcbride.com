import type { NextPage } from "next";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";

export async function getStaticProps() {
  const posts = allPosts
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      banner: post.banner,
    }));

  // const files = fs.readdirSync("data/posts");

  // const posts = files
  //   .map((fileName) => {
  //     const readFile = fs.readFileSync(`data/posts/${fileName}`, "utf-8");
  //     const { data: frontmatter } = matter(readFile);

  //     return {
  //       slug: frontmatter.slug,
  //       frontmatter,
  //     };
  //   })
  //   .sort((a, b) => {
  //     return a.frontmatter.date > b.frontmatter.date
  //       ? -1
  //       : a.frontmatter.date < b.frontmatter.date
  //       ? 1
  //       : 0;
  //   });

  return {
    props: {
      posts,
    },
  };
}

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
      {posts.map(({ slug, title, banner }: any) => (
        <div
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <Link href={`${slug}`}>
            <a>
              <div className="relative aspect-[16/9]">
                <Image
                  alt={title}
                  src={banner}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <h1 className="p-4">{title}</h1>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
