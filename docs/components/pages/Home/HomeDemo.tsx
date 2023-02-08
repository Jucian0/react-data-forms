import { createForm } from "@createform/react";
import JSONPretty from "react-json-pretty";

import * as yup from "yup";
const useLoginForm = createForm({
  initialValues: {
    email: "",
    password: "",
  },
  mode: "onChange",
  validationSchema: yup.object({
    email: yup.string().email(),
    password: yup.string().min(12),
  }),
});

export default function HomeDemo() {
  const { register, state } = useLoginForm();
  const { values, errors, touched } = state;

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
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                {...register("email")}
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
                {...register({ name: "password", type: "password" })}
              />
            </div>
          </div>
        </form>

        <div className="w-full max-w-sm">
          <div className="text-center mb-4">
            <h4 className="font-bold tracking-tight text-2xl">Values</h4>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-2/3 p-2">
              <JSONPretty data={values} />
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="text-center mb-4">
            <h4 className="font-bold tracking-tight text-2xl">Errors</h4>
          </div>
          <div className="md:flex md:items-center mb-6">
          <div className="md:w-2/3 p-2">
            <JSONPretty data={errors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
