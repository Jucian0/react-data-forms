import { createForm } from "@createform/react";
import { CodeWindow } from "../Code";
import { z } from "zod";

const useForm = createForm({
  initialValues: {
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  },
  mode: "onChange",
  validationSchema: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
    terms: z.boolean(),
  }),
});

export function HomeDemo() {
  const { register, state } = useForm();

  return (
    <div className="container mx-auto mb-10">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight  sm:text-4xl">
          onChange Demo
        </h2>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Try mode onChange feature now and experience the power of Createform
        </p>
      </div>
      <div className="flex container justify-center flex-wrap gap-8 mt-16">
        <CodeWindow className="max-w-sm w-full">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold tracking-tight  sm:text-2xl">
              Form
            </h3>
          </div>
          <form noValidate>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                id="email"
                className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                {...register({
                  name: "email",
                  type: "email",
                  placeholder: "name@flowbite.com",
                  required: true,
                })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                id="password"
                className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                {...register({
                  name: "password",
                  type: "password",
                  placeholder: "*********",
                  required: true,
                })}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Repeat password
              </label>
              <input
                id="repeat-password"
                className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                {...register({
                  name: "passwordConfirm",
                  type: "password",
                  placeholder: "*********",
                  required: true,
                })}
              />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  className="w-4 h-4 border border-gray-300 rounded bg-transparent focus:ring-3 focus:ring-blue-300 dark:transparent dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  {...register({
                    name: "terms",
                    type: "checkbox",
                    placeholder: "*********",
                    required: true,
                  })}
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-brand hover:underline dark:text-brand"
                >
                  terms and conditions
                </a>
              </label>
            </div>
          </form>
        </CodeWindow>
        <CodeWindow className="max-w-sm w-full">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold tracking-tight  sm:text-2xl">
              Values
            </h3>
          </div>
          <pre className="font-mono">
            {JSON.stringify(state.values, null, 2)}
          </pre>
        </CodeWindow>
        <CodeWindow className="max-w-sm w-full">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold tracking-tight  sm:text-2xl">
              Zod schema
            </h3>
          </div>
          <pre className="text-brand font-mono">
            {JSON.stringify(
              {
                email: "z.string().email()",
                password: "z.string().min(8)",
                passwordConfirm: "z.string().min(8)",
                terms: "z.boolean()",
              },
              null,
              2
            )}
          </pre>
          <div className="mt-10 mb-5 border-b border-gray-200  dark:border-gray-700" />

          <div className="text-center mb-4">
            <h3 className="text-xl font-bold tracking-tight  sm:text-2xl">
              Errors
            </h3>
          </div>
          <pre className="text-red-600 font-mono">
            {JSON.stringify(state.errors, null, 2)}
          </pre>
        </CodeWindow>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" />
    </div>
  );
}
