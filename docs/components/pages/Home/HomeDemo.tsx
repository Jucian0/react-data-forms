// import { createForm } from "@createform/react";

// const useLoginForm = createForm({
//   initialValues: {
//     email: "",
//     password: "",
//     options: "three",
//     range: 10,
//   },
//   mode: "onSubmit",
// });

export default function HomeDemo() {
  // const { register, handleReset, handleSubmit, setFieldValue } = useLoginForm();

  function onSubmit(e: any) {
    console.log(e);
  }

  function onReset(e: any) {
    console.log(e);
  }

  return (
    <div className="container mx-auto mt-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight  sm:text-4xl">
          Form demo
        </h2>
      </div>

      <div className="flex container justify-center flex-wrap gap-y-2 gap-x-2">
        <form className="w-full max-w-sm">
          <div className="text-center mb-4">
            <h4 className="font-bold tracking-tight text-2xl">Form</h4>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value="Jane Doe"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>

        <div className="w-full max-w-sm">
          <div className="text-center mb-4">
            <h4 className="font-bold tracking-tight text-2xl">Values</h4>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <span>{"message error"}</span>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <span>{"message error"}</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="text-center mb-4">
            <h4 className="font-bold tracking-tight text-2xl">Errors</h4>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <span className="text-red-500">{"message error"}</span>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <span className="text-red-500">{"message error"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
