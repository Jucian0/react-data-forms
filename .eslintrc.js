module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-createform`
  extends: ["createform"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
