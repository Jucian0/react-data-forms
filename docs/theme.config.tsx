import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useConfig, DocsThemeConfig, ThemeSwitch } from 'nextra-theme-docs';

import { Discord, Github } from './components/Social';
import { Footer } from './components/Footer';
import HeaderLogo from './components/HeaderLogo';

const SITE_ROOT = 'https://useform.org';

/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
const theme = {
  sidebar: {
    defaultMenuCollapseLevel: Number.POSITIVE_INFINITY,
  },
  docsRepositoryBase: 'https://github.com/jucian0/createform/blob/main/docs',
  useNextSeoProps: function SEO() {
    const { frontMatter } = useConfig();

    const defaultTitle = frontMatter.overrideTitle || 'Createform';

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: `%s – Createform`,
    };
  },
  gitTimestamp({ timestamp }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dateString, setDateString] = useState(timestamp.toISOString());

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      try {
        setDateString(
          timestamp.toLocaleDateString(navigator.language, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        );
      } catch (e) {
        // Ignore errors here; they get the ISO string.
        // At least one person out there has manually misconfigured navigator.language.
      }
    }, [timestamp]);

    return <>Last updated on {dateString}</>;
  },
  // unstable_flexsearch: true,
  // unstable_staticImage: true,
  toc: {
    float: true,
    // extraContent: ExtraContent,
  },
  font: false,
  feedback: {
    link: 'Question? Give us feedback →',
  },
  logo: HeaderLogo,
  logoLink: false,
  head: function Head() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const fullUrl =
      router.asPath === '/' ? SITE_ROOT : `${SITE_ROOT}${router.asPath}`;

    let ogUrl = frontMatter.ogImage
      ? `${SITE_ROOT}${frontMatter.ogImage}`
      : `${SITE_ROOT}/images/media.png`;

    let keywords = frontMatter.tags;

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/favicon/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon/favicon-16x16.png`}
        />
        <link
          rel="mask-icon"
          href={`/favicon/safari-pinned-tab.svg`}
          color="#000000"
        />
        <link rel="shortcut icon" href={`/favicon/favicon.ico`} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juciano_barbosa" />
        <meta name="twitter:creator" content="@juciano_barbosa" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <link rel="canonical" href={fullUrl} />
        <meta property="twitter:image" content={ogUrl} />
        <meta property="og:image" content={ogUrl} />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Createform" />
        <meta name="keywords" content={keywords} />
      </>
    );
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  navbar: {
    extraContent: (
      <>
        <Github />
        <Discord />
        <ThemeSwitch />
      </>
    ),
  },
  search: {
    placeholder: 'Search documentation…',
  },
  footer: {
    component: Footer,
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
};
export default theme;
