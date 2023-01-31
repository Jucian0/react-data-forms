![createform-logo](../../img/logo.svg)

<h1 align="center">Createform 👋</h1>

[![GitHub license](https://img.shields.io/badge/License-mit-green)](https://github.com/Jucian0/useformcreateform/blob/master/LICENSE)
[![GitHub coverage](https://img.shields.io/badge/coverage-96.8%25-brightgreen)](https://github.com/jucian0/createform/tree/master/test)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=React+hook+for+forms+and+validations&url=https://github.com/jucian0/createform&hashtags=reactjs,hook,javascript,forms)

Createform is an open source project that allows you to create forms easily, different from the others options, this package guides you to create custom hooks to manage your forms, you can use the same form in different components without context API.

- As other packages, you can also use yup validation to validate your form.
- You can also use different approaches to handle your form, like `onSubmit | onChange | debounce`.
- Less code than other options.

## Description

Forms are an important element of a website because they allow users to interact with the website and provide input or information. Forms are often used for a variety of purposes, such as logging in to an account, creating a new account, submitting a search query, placing an order, and many other purposes.

One of the key benefits of using forms on a website is that they allow users to provide specific information or input that can be processed and used by the website. For example, a login form allows users to provide their username and password, which can then be validated and used to grant the user access to their account. A search form allows users to provide a query, which can then be used by the website to return relevant results.

In addition to providing a way for users to interact with a website, forms are also an important tool for gathering information from users. This information can be used to improve the website, provide personalized experiences, and help businesses make better decisions.

Overall, forms are an essential element of most websites and play a crucial role in enabling user interaction and gathering information.

When we think about forms, react hooks are a game-changer, because they simplify the process of creating forms and don't require libraries.  
However, if you want to build forms with nested fields and validations, it is better to use a library, and you can find a lot of libraries on internet, so, why another one?

## How it works

Createform uses an external store to keep the form state, but it's not enough, we need to share the state with other components without React Context. For this reason, we have a function called `createForm`;
This function creates a form and returns a function that can be used as a hook, this hook is connected to the store, so whenever the store changes, the hook will be notified and the form will be updated.

In other words, the `createForm` function creates a form and returns a function that has all resources to manage the form, if you use it ten times, it will be the same form and the same store being managed in different places.

For that reason, we can use the same form in different components without providers or React Context API.

![createform-flow](../../img/createform-flow.png)

## Reasons to use Createform

There are several motivations for using a custom form hook created by `createForm` in a React application. Some of these motivations include:

- **Reusability**: One of the main benefits of using a custom form hook created by `createForm` is that it allows you to reuse the same form logic across multiple components in your application. This means that you don't have to write the same form handling code multiple times, which can save you time and make your code more organized and maintainable.

- **Flexibility**: A custom form hook created by `createForm` allows you to customize the behavior of your forms and define exactly how they should work. This can be useful if you have specific requirements for your forms, such as validating user input or submitting the form data to an API.

- **Simplicity**: Using a custom form hook created by `createForm` can make it easier to work with forms in your React application. By abstracting away the details of form handling, you can focus on the core logic of your application and avoid getting bogged down in the complexities of form management.

- **Separation of concerns**: A custom form hook created by `createForm` allows you to separate the concerns of form handling and data management from the rest of your application. This can make it easier to test and maintain your code, as well as improve the overall organization and structure of your application.

## So, why Createform?

There are some reasons why you face problems when you want to create forms, and with Createform, you can solve these problems.

- **State management** - A couple of years ago, you could think that Redux or
  MobX was a the best solution to manage form state in react, and they were, but not anymore. Today
  you can use hooks to manage the form state, hooks like `useStatew` and
  `useReducer` are a good solution to manage the state. But managing values,
  touched fields and errors could be a problem if you don't have a standard way to
  manage them. Usually, real applications use nested objects as request payloads,
  and you should keep it to send the correct data to the server, manage nested
  values and errors could be a problem using just `useState` and `useReducer`.

- **Errors** - To deal with errors, you can use your validation solution, and it can
  work well with simple forms, but you can stuck with a lot of errors when you
  have nested fields.

- **Touched fields** - Maybe you want to show a message error
  just when the field is touched, so in order to do that you need to manage the
  touched fields, it can be really easy to do with `useState` and `useReducer`,
  but you can't do that very well with `useState` and `useReducer` when you have
  nested fields.

- **Handle submit** - When you want to handle submit, you need to
  manage the submit event, it's convenient when you have an already solution to do
  that.

Createform provides a way to create complex forms easily, this hook returns an object
of values ​​in the same shape that it receives, this is possible using dot notation.
Therefore, it does not matter if the object is complex or has many properties or
an array, the result is the same. This process turns very easy to create forms from
nested objects, the same layers and properties are replicated in the final object,
this approach prevents you to type more code to convert an object from form to backend
object type. The same process is realized with errors objects and touched objects.

## What to expect with Createform

- **Performer forms** - Createform provides a way to complete a form and submit it without any rerender, by default Createform creates uncontrolled forms.
- **Easy to write** - Createform has an easy way to write forms with less code. register function return necessary input's properties and it is all we need to manage all events in a native HTML `input`. Writhe forms without form tag.
- **Easy validation** - By default Createform uses yup validation, we can write complex validation without effort.

## Installation

```bash
npm install --save @createform/react
```

```bash
yarn add @createform/react
```

## First step

The first step is to create your form with the `createForm` function, this function returns a hook that you can use to manage your form, wherever you want to use.

```javascript
import { createForm } from '@createform/react';

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

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jucian0/createform/issues). You can also take a look at the [contributing guide](https://github.com/Jucian0/createform/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

[![Stargazers repo roster for createform](https://reporoster.com/stars/jucian0/createform)](https://github.com/jucian0/createform/stargazers)

## 📝 License

Copyright © 2023 [jucian0](https://github.com/jucian0).<br />
This project is [MIT](https://github.com/jucian0/createform/blob/53debd6986650f76561795f2069d6eebc5db6c65/LICENSE) licensed.
