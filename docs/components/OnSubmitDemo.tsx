import { createForm } from "@createform/react";
import { z } from "zod";

const useForm = createForm({
  initialValues: {
    email: "",
    password: "",
    terms: false,
  },
  mode: "onChange",
  validationSchema: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    terms: z.boolean(),
  }),
});

export function FormDemo() {
  const { register, handleSubmit, state } = useForm();
  const { errors } = state;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((e) => {
        console.log(e, state);
      })}
      className="border dark:border-gray-800 p-5 rounded"
    >
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
            placeholder: "createform@demo.com",
            required: true,
          })}
        />
        <span className="text-red-600">{errors.email}</span>
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
        <span className="text-red-600">{errors.password}</span>
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
          <a href="#" className="text-brand hover:underline dark:text-brand">
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="py-2 px-4 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Submit <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
