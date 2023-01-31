import { RiGithubFill } from 'react-icons/ri';
import logo from '/public/imgs/logo.svg';

export default {
  title: 'Createform',
  description: 'Easily, and delightful documentation website generator!',
  rootDocs: 'docs',
  loadSidebarIcons: true,
  repository: {
    url: 'https://github.com/jucian0/createform',
    branch: 'main',
    author: 'Jucian0',
  },
  nav: {
    logo,
    textLogo: 'Createform',
    links: [
      {
        title: 'Docs',
        href: '/docs/introduction/quick-start',
      },
    ],
    iconsLinks: [
      {
        icon: <RiGithubFill fill="var(--nextui-colors-accents6)" size={20} />,
        href: 'https://github.com/jucian0/createform',
        external: true,
      },
    ],
    search_bar: 'Search',
  },
  footer: {
    text: (
      <span>
        Createform 2023 Developed by:{' '}
        <a href={'https://github.com/jucian0'}> Juciano</a> {' and '}
        <a href="https://engrafia.vercel.app/">Engrafia</a>
      </span>
    ),
    logo,
  },
  sidebar: {
    order: [
      'introduction',
      'how-it-works',
      'creating-a-form',
      'validation',
      'using-your-form',
      'api-reference',
      'tutorials',
    ],
  },
};
