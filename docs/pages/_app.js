import { darkTheme, lightTheme } from './../styles/theme';
import { Demo, List, Paragraph, Strong } from './../demo';
import { Engrafia } from 'engrafia';
import Head from 'next/head';

function App({ Component, pageProps }) {
  const meta = pageProps.meta;

  return (
    <Engrafia
      mdxComponents={{ Demo, ul: List, p: Paragraph, strong: Strong }}
      themes={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      <Head>
        <link href="https://css.gg/link.css" rel="stylesheet" />
        <title>{`Createform | ${meta?.title}`}</title>
        <meta name="description" content={meta?.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://useform.org" />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://useform.org" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Createform | ${meta?.title}`} />
        <meta property="og:description" content={meta?.description} />
        <meta name="og:image" content="https://useform.org/imgs/lib_logo.png" />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="react-useform.vercel.app" />
        <meta property="twitter:url" content="https://useform.org/" />
        <meta name="twitter:title" content={`Createform | ${meta?.title}`} />
        <meta name="twitter:description" content={meta?.description} />
        <meta
          name="twitter:image"
          content="https://useform.org/imgs/lib_logo.png"
        />
        <link rel="sitemap" href="/sitemap.xml" />
        <meta name="keywords" content={meta?.tags} />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>
      <Component {...pageProps} />
    </Engrafia>
  );
}

export default App;
