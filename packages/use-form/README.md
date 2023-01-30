![Logo](img/logo3.png)

<h1 align="center">Welcome to useForm 👋</h1>

[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/useform/blob/master/LICENSE)
[![GitHub coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)](https://github.com/use-form/use-form/tree/master/test)
[![Size](https://badgen.net/badge/miniziped%20size/3.3/blue)](https://bundlephobia.com/package/useform@2.0.2)
[![Size](https://badgen.net/badge/minifield%20size/9.7/blue)](https://bundlephobia.com/package/useform@2.0.2)
[![npm version](https://badgen.net/badge/npm/v3.0/pink)](https://www.npmjs.com/package/useform)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hook+for+forms+and+validations&url=https://github.com/use-form/use-form&hashtags=reactjs,hook,javascript,forms)

> useForm provides a way to create complex forms easily.

### 🏠 [Homepage](https://useform.org)

### ✨ [Demo](https://codesandbox.io/s/useform-2u2ju)

# UseForm

> Create hooks to manage your forms.

UseForm is an open source project that allows you to create forms easily, different from the others options, this package guides you to create custom hooks to manage your forms, you can use the same form in different components without context API.

- As other packages, you can also use yup validation to validate your form.
- You can also use different approaches to handle your form, like `onSubmit | onChange | debounce`.
- Less code than other options.

## Motivation

Today we have a lot of form packages, and this project doesn't pretend to be the number one, this is just a new way to create hooks to manage your forms. But if you guys like this project, we can publish it, and maintain it.

## Instalation

### NPM

```bash
npm i @use-form/use-form
```

### YARN

```bash
yarn add @use-form/use-form
```

## First step

The first step is to create your form with the `createForm` function, this function returns a hook that you can use to manage your form, wherever you want to use.

```javascript
import { createForm } from '@use-form/use-form';

export const useLoginForm = createForm({
  initialValues: {
    email: 'jucian0@jucian0.com',
    password: 'yourpassword',
  },
});
```

## Second step

The second step is to create a component to render your form, you can use the `useLoginForm` hook to get the form state and manage it.

```jsx
import { useLoginForm } from './useLoginForm.js';

const LoginForm = () => {
  const { handleSubmit, register } = useLoginForm();

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} />
      <input type="password" {...register('password')} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

# It's All.

## Read the full documentation [here](https://useform.org/docs/).

### [Post](https://dev.to/jucian0/building-forms-with-useform-1cna)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jucian0/useform/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/useform/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

[![Stargazers repo roster for useform](https://reporoster.com/stars/jucian0/useform)](https://github.com/jucian0/useform/stargazers)

## 📝 License

Copyright © 2023 [jucian0](https://github.com/jucian0).<br />
This project is [MIT](https://github.com/jucian0/use-form/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
