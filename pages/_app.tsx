import "styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import PlausibleProvider from "next-plausible";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="paulmcbride.com">
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}
