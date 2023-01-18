// import dynamic from "next/dynamic";
// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
// import ReactPlayer from "react-player";
import React from "react";

interface YoutubeProps {
  code: string;
  title: string;
}

export default function Youtube(props: YoutubeProps) {
  // const url = props.url.replace("watch?v=", "embed/");
  return (
    <div className="relative aspect-[16/9] rounded-md overflow-hidden">
      <iframe
        src={`https://youtube.com/embed/${props.code}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={props.title}
        className="absolute inset-0 z-0"
      />
      {/* <ReactPlayer
        url={props.url}
        width="100%"
        height="100%"
        controls
        light
        className={`absolute inset-0 z-0`}
      /> */}
    </div>
  );
}
