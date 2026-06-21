import "styles/globals.css";

import type { AppProps } from "next/app";
import type { DetailedHTMLProps, ScriptHTMLAttributes } from "react";
import PlausibleProvider from "next-plausible";
import { Playfair_Display, Lora } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const plausibleScriptProps = { "data-domain": "paulmcbride.com" } as unknown as DetailedHTMLProps<
  ScriptHTMLAttributes<HTMLScriptElement>,
  HTMLScriptElement
>;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider
      src="/proxy/js/script.js"
      init={{ endpoint: "/proxy/api/event" }}
      scriptProps={plausibleScriptProps}
    >
      <div className={`${playfair.variable} ${lora.variable}`}>
        <Component {...pageProps} />
      </div>
    </PlausibleProvider>
  );
}
