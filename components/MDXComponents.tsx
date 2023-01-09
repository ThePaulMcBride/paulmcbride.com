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

const Note = ({ note }: { note: String }) => {
  return (
    <div className="bg-gray-50 px-8 py-1 rounded-lg border border-gray-100">
      <p className="text-gray-600 font-body text-lg leading-relaxed md:text-xl md:leading-relaxed">
        <b>Note:</b> {note}
      </p>
    </div>
  );
};

const MDXComponents = {
  a: CustomLink,
  Youtube: Youtube,
  img: CustomImage,
  blockquote: BlockQuote,
  Note: Note,
};

export default MDXComponents;
