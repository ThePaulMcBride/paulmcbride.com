import "styles/globals.css";

import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import { Playfair_Display, Lora } from "@next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="paulmcbride.com">
      <div className={`${playfair.variable} ${lora.variable}`}>
        <Component {...pageProps} />
      </div>
    </PlausibleProvider>
  );
}
