import "../globals.css";
import "../custom.css";

import { SSRProvider } from "@react-aria/ssr";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

type NextraAppProps = AppProps & {
  Component: AppProps["Component"] & {
    getLayout: (page: ReactNode) => ReactNode;
  };
};

// Shim requestIdleCallback in Safari
if (typeof window !== "undefined" && !("requestIdleCallback" in window)) {
  (window as any).requestIdleCallback = (fn) => setTimeout(fn, 1);
  (window as any).cancelIdleCallback = (e) => clearTimeout(e);
}

export default function Nextra({ Component, pageProps }: NextraAppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
      <Analytics />
    </SSRProvider>
  );
}
