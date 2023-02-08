---
title: ReactJs Building forms
description: Hello friends, today I will talk to you about forms in React.
tags: react, form, webdev, javascript
---

# ReactJs: Building forms

Do you really need a form library to build forms in React?

Hello friends, today I will talk to you about forms in React, and tell you how my first experience building form in React was.

My relationship with React when I created forms was a love-hate relationship, because React doesn't tell you how everything should work. Another reason was that Angular has a powerful solution to build forms (yeah, I've worked with Angular before), and honestly, I never found anything as good as reactive forms in React ecosystem. But everything changed when the React team introduced Hooks API, after that the process to create forms became very simple, and I started to think if it was really necessary to use a form library to implement forms in React.

In this post, I will show you an easy way to build forms without any form library, and at the end of this post you will decide if it's really necessary to use a form library, however, regardless of your opinion, I hope that you learn something in this post.

Let's start with the first example of how to implement a form without a form library. In this example, I will explore an effective way to create an advanced components form.

## Basic requirements?

To perform this tutorial you will need to have:

- Basic knowledge of Javascript.
- Basic knowledge of React.
- NodeJS in your environment.

In this post I will use Yarn, feel free to use NPM, I usually use Typescript, but I will write the code with Javascript since Typescript user is familiar with Javascript too.

## First steps

To start we need to initiate a React application with the command:

```bash
npx create-react-app react-form
cd react-form
yarn
yarn start
```

We are creating an application, opening the application directory, installing dependencies, and starting the application.

Form libraries can be optional, but if you want good validation in your forms you should use a library form validation. For this tutorial I will use Yup, since that our goal is to learn how to implement good forms, I will use Bootstrap to work more easily.

```bash
yarn add bootstrap
yarn add yup
```

The create-react-app creates some files that we will not use for this tutorial, for this reason, I will remove them, so the files structures are:

![files structure](https://res.cloudinary.com/practicaldev/image/fetch/s--rDtSgnqF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2000/1%2AP8fTwj1DIETEFG6BlOf5iA.png)

### index.css

```css
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap");

@import "./../node_modules/bootstrap/dist/css/bootstrap.css";
```

### App.js

```javascript
import React from "react";

function App() {
  return <div></div>;
}

export default App;
```

### index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

## Forms with controlled input

Forms with controlled inputs are the most common example included in libraries. In this approach, every time that the input value is changed the component is rendered again, so we save the input value in a specific state:

```jsx copy
function Input() {
  const [input, setInput] = useState("");

  return <input name="input" onChange={(e) => setInput(e.target.value)} />;
}
```

I will create a folder for every component, this way the files should have the name `index.jsx`.

For this form I will create a component in `Components/FormControlled/Input`, this component will be responsible to show a label, an input, and in case of error, a span with an error message. In this component we should validate whether the input was touched or not, it's helpful to show error messages.

```jsx copy
import React, { useRef, useEffect, ChangeEvent, useState } from "react";

function Input({ error, label, ...rest }) {
  const [touched, setTouched] = useState(false);

  return (
    <>
      <label htmlFor={rest.name}>{label}</label>
      <input
        className="form-control"
        {...rest}
        onBlur={() => setTouched(true)}
      />
      <span className="text-danger">{touched && error}</span>
    </>
  );
}

export default Input;
```

The principal component will be `Components/FormControlled`, this is the component where we will build our form, so let's implement it:

```jsx copy
import React, { useState, useEffect } from "react";
import Input from "./Input";

const initialFormState = {
   name:'',
   email:'',
   password:''
}

const function(){

   const [form, setForm] = useState(initialFormState)

   function setInput(inputName){
      return (e)=>{
         const newValue = {[inputName]:e.target.value}
              return setForm(form => ({...form, ...newValue}))
      }
   }

   return (
      <>
         <h3>Form Controlled</h3>
         <form>
               <div className="form-group">
                  <Input
                     name="name"
                     onChange={setInput('name')}
                     label="Name"
                     value={form.name}
                  />
               </div>
               <div className="form-group">
                  <Input
                     name="email"
                     onChange={setInput('email')}
                     label="E-mail"
                     value={form.email}
                  />
               </div>
               <div className="form-group">
                  <Input
                     name="password"
                     onChange={setInput('password')}
                     label="Password"
                     value={form.password}
                  />
               </div>

               <div className="form-group">
                  <button type="button" className="btn btn-primary">Submit</button>
               </div>
         </form>
      </>
   );
}

export default UserForm;
```

### What is happening here?

- I'm creating a state for our form.
- I have a function called `setInput` that receives the input name and return another function that receives the input change event, you can find more information about that [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).
- After that, I just return the template of component with the Input component. I just need to pass the field name in `setInput` because this function will return a function that receives input change event as argument, and the second function know the context of the first function.

In order to have the application working, we need to make some changes in `App.js`.

```jsx copy
import React from "react";
import FormControlled from "./Components/FormControlled";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <FormControlled />
        </div>
      </div>
    </div>
  );
}

export default App;
```

```bash
yarn start
```

## Adding field validations

As mentioned before, we will use Yup to create input validations, I believe that this is the best option to create validations because this package gives us a great number of resources which saves us time in having to write them.

In this case, I'm creating an object with the same structure as our form state, and adding some roles that should be applied, after that I add the message errors.

```javascript
import * as yup from "yup";

export const FormValidations = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("E-mail is invalid").required("E-mail is required"),
  password: yup.string().min(8, "Minimum 8 chars").max(20, "Max 20 chars"),
});
```

Let's back to the `Components/FormControlled` and add this validation in our form.

```jsx copy
 /*...................*/
import {FormValidations} from './index.validations'
import useValidation from './../../hooks/useValidation'

 /*...................*/

const function(){
 /*...................*/
   const [error, setErrors] = useState({})

   async function validate(){
      try{
         await formValidations.validate(form, {abortEarly:true})
         setErrors({})
      }catch(e){
         if(e instanceof ValidationError){
            const errors = {}
            e.inner.forEach(key=>{
               errors[key.path] = key.message
            })
            setErrors(errors)
         }
      }
   }

   useEffect(()=>{validate()},[form])

   return (
      <>
         <h3>Form Controlled</h3>
         <form>
               <div className="form-group">
                  <Input
                     /*...................*/
                     error={error.name}
                  />
               </div>
               <div className="form-group">
                  <Input
                     /*...................*/
                     error={error.email}
                  />
               </div>
               <div className="form-group">
                  <Input
                     /*...................*/
                     error={error.password}
                  />
               </div>

               <div className="form-group">
                  <button type="button" className="btn btn-primary">Submit</button>
               </div>
         </form>
      </>
   );
}

export default UserForm;
```

## Let's look at some changes

- Added news state to save errors.
- Added a function named validate, this function should receive the form values and pass this value to object validation written in the last step. If the form state has a valid value, we set an empty object in the errors state, but if it has any error, we need to know if is an error of validation (ValidationError instance), before setting them in the errors state.
- To update the errors every time that form is changed, we pass form state as a dependency in the useEffect hook.
- Added object error with the specific property in every field. If you run the application again you will see the form working well with validation.

![form](https://res.cloudinary.com/practicaldev/image/fetch/s--jdctQqlV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/2000/1%2ATGVW5G3z762WRaeqteXEZw.png)

## Improving our solution.

I think that we can improve our code, we can split some parts of our code and create a new hook to make the code more understandable and cleaner.

### Creating a hook useValidation

First of all, I will create a folder called Hooks in the root of application `Hooks/useValidation`, inside the folder I will create a file called `index.js`. Inside this file, we just need to put part of our code, validate function, `useEffect` hook, and the error state. Finally, we return an object with the error state.

```javascript
import React, { useState, useEffect } from "react";
import { ValidationError } from "yup";

const useValidation = (values, schema) => {
  const [errors, setErrors] = useState({});

  const validate = async () => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
    } catch (e) {
      if (e instanceof ValidationError) {
        const errors = {};
        e.inner.forEach((key) => {
          errors[key.path] = key.message;
        });
        setErrors(errors);
      }
    }
  };

  useEffect(() => {
    validate();
  }, [values]);

  return { errors };
};

export default useValidation;
```

## Improving form component

I just need to remove the code that was added in `useValidation` hook, and import the new hook.

```jsx copy
import React, { useState, useEffect } from "react";
import Input from "./Input";
import { FormValidations } from "./index.validations";
import useValidation from "./../../hooks/useValidation";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

const UserForm = () => {
  const [form, setForm] = useState(initialFormState);
  const { errors } = useValidation(form, FormValidations);

  function setInput(inputName) {
    return (e) => {
      const newValue = { [inputName]: e.target.value };
      return setForm((form) => ({ ...form, ...newValue }));
    };
  }

  return (
    <>
      <h3>Form Controlled</h3>
      <form>
        <div className="form-group">
          <Input
            name="name"
            onChange={setInput("name")}
            label="Name"
            value={form.name}
            error={errors.name}
          />
        </div>
        <div className="form-group">
          <Input
            name="email"
            onChange={setInput("email")}
            label="E-mail"
            value={form.email}
            error={errors.email}
          />
        </div>
        <div className="form-group">
          <Input
            name="password"
            onChange={setInput("password")}
            label="Password"
            value={form.password}
            error={errors.password}
          />
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
```

## Advantages

- It's is simple code.
- Validation with every change give us a better experience.

## Disadvantages

- This isn't the better approach if you want better performance.
- The component is rendered again every time that the state is changed.

Look at the complete code in github: https://github.com/Jucian0/react-form-controlled
Codesandbox: https://codesandbox.io/s/controled-form-tutorial-yt4oj

In the next post I will show you how to improve this code to make it perform better.
