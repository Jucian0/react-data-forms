import { darkTheme, lightTheme } from './../styles/theme';
import { Demo } from './../demo';
import { Engrafia } from 'engrafia';

function App({ Component, pageProps }) {
  const meta = pageProps.meta;

  return (
    <Engrafia
      mdxComponents={{ Demo }}
      themes={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      <Head>
        <title>{`UseForm | ${meta?.title}`}</title>
        <meta name="description" content={meta?.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://react-useform.vercel.app" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://react-useform.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`UseForm | ${meta?.title}`} />
        <meta property="og:description" content={meta?.description} />
        <meta
          name="og:image"
          content="https://react-useform.vercel.app/imgs/lib_logo.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="react-useform.vercel.app" />
        <meta
          property="twitter:url"
          content="https://react-useform.vercel.app/"
        />
        <meta name="twitter:title" content={`UseForm | ${meta?.title}`} />
        <meta name="twitter:description" content={meta?.description} />
        <meta
          name="twitter:image"
          content="https://react-useform.vercel.app/imgs/lib_logo.png"
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
