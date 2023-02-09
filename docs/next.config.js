const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  swcMinify: false,
});

module.exports = withNextra();
