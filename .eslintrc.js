module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config`
  extends: ["createform"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
