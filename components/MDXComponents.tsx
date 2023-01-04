import Link from "next/link";
// import Image from "next/image";
import Youtube from "components/Youtube";

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const CustomImage = (props: any) => {
  return <img src={props.src} alt={props.alt} className="rounded-lg" />;
  // return (
  //   <Image
  //     alt={props.alt}
  //     src={`${props.src}`}
  //     layout="fill"
  //     className="w-full"
  //   />
  // );
};

const BlockQuote = (props: any) => {
  return (
    <blockquote className="border-l-4 border-gray-200 pl-4 mb-4 [&_p]:mb-0">
      {props.children}
    </blockquote>
  );
};

const MDXComponents = {
  a: CustomLink,
  Youtube: Youtube,
  img: CustomImage,
  blockquote: BlockQuote,
};

export default MDXComponents;
