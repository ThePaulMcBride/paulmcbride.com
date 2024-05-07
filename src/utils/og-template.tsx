import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";

export interface OgData {
  title: string;
  date: Date;
}

const Template = (props: OgData) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      backgroundColor: "#1a202c",

      color: "white",
      fontFamily: "Lora",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "44px",
          fontWeight: "900",
          alignItems: "center",
          fontFamily: "Playfair Display",
        }}
      >
        <span>Paul McBride</span>
        {/* <span
          style={{
            marginLeft: "0.5rem",
            width: "1.2rem",
            height: "2.8rem",
            backgroundColor: "#66ff66",
          }}
        ></span> */}
      </div>

      <div
        style={{
          fontSize: "94px",
          fontWeight: "900",
          lineHeight: "1.1",
          display: "flex",
          fontFamily: "Inter",
        }}
      >
        {props.title}
      </div>
    </div>
  </div>
);

async function getFont(
  font: string,
  weights = [400, 500, 600, 700],
  text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\!@#$%^&*()_+-=<>?[]{}|;:,.`'’\"–—",
) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(
      ";",
    )}&text=${encodeURIComponent(text)}`,
    {
      headers: {
        // Make sure it returns TTF.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    },
  ).then((response) => response.text());
  const resource = css.matchAll(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/g,
  );
  return Promise.all(
    [...resource]
      .map((match) => match[1])
      .map((url) => fetch(url).then((response) => response.arrayBuffer()))
      .map(async (buffer, i) => ({
        name: font,
        style: "normal",
        weight: weights[i],
        data: await buffer,
      })),
  ) as Promise<SatoriOptions["fonts"]>;
}

const generateOgImage = async (
  text: string = "Default Title",
  date: Date = new Date(),
) => {
  const options: SatoriOptions = {
    width: 1200,
    height: 630,
    embedFont: true,
    fonts: await Promise.all([
      getFont("Lora"),
      getFont("Playfair Display"),
    ]).then((fonts) => fonts.flat()),
  };

  const svg = await satori(
    Template({
      title: text,
      date: date,
    }),
    options,
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const data = pngData.asPng();

  return data;
};

export default generateOgImage;
