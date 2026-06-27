import tags from "@data/tags";
import BlogPost from "components/BlogPost";
import Container from "components/Container";
import type { GetStaticProps } from "next";
import { getAllPosts, PostSummary } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";

type Tag = {
  slug: string;
  title: string;
};

type TagProps = {
  tag: Tag;
  posts: PostSummary[];
};

export const getStaticPaths = async () => {
  const paths = Object.values(tags).map((tag) => ({
    params: { tag: tag.slug },
  }));

  return {
    paths,
    fallback: "blocking",
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

  const posts = (await getAllPosts()).filter((post) =>
    post.tags?.includes(tag.slug)
  );

  return {
    props: {
      tag,
      posts,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

function Tags(props: TagProps) {
  return (
    <Container
      title={`Posts tagged with ${props.tag.title} – Paul McBride`}
      description={`Posts and articles tagged with ${props.tag.title}.`}
    >
      <div className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 mx-auto mb-16 px-8">
        <h1 className="mb-8 text-3xl font-serif font-bold tracking-tight text-gray-800 md:text-5xl">
          Posts tagged with {props.tag.title}
        </h1>

        {props.posts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
}

export default Tags;
