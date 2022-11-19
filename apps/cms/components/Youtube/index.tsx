import * as React from "react";
import ReactPlayer from "react-player/youtube";

export function Youtube(props) {
  const { value } = props;
  if (!value) return null;
  const { url } = value;
  return (
    <>
      <ReactPlayer url={url} />;
    </>
  );
}
