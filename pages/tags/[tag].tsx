import tags from "@data/tags";
import BlogPost from "components/BlogPost";
import Container from "components/Container";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps } from "next";

export const getStaticPaths = async () => {
  const paths = Object.values(tags).map((tag) => ({
    params: { tag: tag.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.tag) {
    return {
      notFound: true,
    };
  }

  const tag = Object.values(tags).find((tag) => tag.slug === params.tag);
  if (!tag) {
    return {
      notFound: true,
    };
  }

  const posts = allPosts
    .filter((post) => post.tags.includes(tag.slug as any))
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });

  return {
    props: {
      tag,
      posts,
    },
  };
};

function Tags(props: { tag: any; posts: Post[] }) {
  return (
    <Container
      title={`Posts tagged with ${props.tag.title} – Paul McBride`}
      description={`Posts and articles tagged with ${props.tag.title}.`}
    >
      <div className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 mx-auto mb-16 px-8">
        <h1 className="mb-8 text-3xl font-serif font-bold tracking-tight text-gray-800 md:text-5xl">
          Posts tagged with {props.tag.title}
        </h1>

        {props.posts.map((post: any) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
}

export default Tags;
