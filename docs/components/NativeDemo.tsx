import { createForm } from "@createform/react";

const useForm = createForm({
  initialValues: {
    email: "",
    test: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    address: {
      street: "",
      number: null,
    },
  },
  mode: "onChange",
});

export function FormDemo() {
  const {
    register,
    setFieldError,
    handleSubmit,
    state,
    handleReset,
    setFieldValue,
  } = useForm();
  const { errors, touched } = state;

  setFieldValue("email", 23);

  setFieldError("test.4", "Error message");
  setFieldValue("address.number", 23);

  return (
    <form
      noValidate
      onSubmit={handleSubmit((e) => {
        console.log(e, state);
      })}
      onReset={handleReset(() => {})}
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
          {...register("test.5")}
        />
        <input
          id="email"
          className="shadow-sm bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          {...register({ name: "test.0" })}
        />
        <input
          {...register({
            name: "email", // (property) name: "email" | "test" | `test.${number}`
            type: "email",
            placeholder: "createform@demo.com",
          })}
        />
        <span className="text-red-600">{touched.email && errors.email}</span>
      </div>
      <button
        type="submit"
        className="text-white py-2 px-4 mr-2 mb-2 text-md font-medium focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white dark:text-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Submit <span aria-hidden="true">→</span>
      </button>
      <button
        type="reset"
        className="py-2 px-4 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Reset
      </button>
    </form>
  );
}
