import ReactPlayer from "react-player";

export default function Video(props: any) {
  return (
    <div className="relative aspect-[16/9] rounded-md overflow-hidden">
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
