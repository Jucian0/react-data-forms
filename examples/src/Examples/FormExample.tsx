import { CreateState, createForm } from "@createform/react";
import { Button, Input, Select, Stack } from "@chakra-ui/react";
import React from "react";

type Form = CreateState<{
  email: string;
  password: string;
  role: string;
}>;

const useLoginForm = createForm(({ set, get }) => ({
  values: {
    email: "mariana@mariana",
    password: "",
    options: "",
  },
  preload: async () => {
    try {
      const data = await getFormValues();
      console.log(data);
      set({ ...get(), values: data });
    } catch (e) {
      console.log(e);
    }
  },
}));

function getFormValues() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        email: "juciano@juciano.com",
        password: "123456",
        options: "one",
      });
    }, 1000);
  });
}

export function FormExample() {
  const { register, handleReset, handleSubmit, setFieldValue, ...form } =
    useLoginForm();

  function onSubmit(e: any) {
    console.log(e);
  }

  function onReset(e: any) {
    console.log(e);
  }

  const ref = React.useRef(null);

  return (
    <Stack p={30}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset(onReset)}>
        <Input mt={5} type="text" {...register("email")} />
        <Input mt={5} type="password" {...register("password")} />
        {/* <Input type="range" {...register("range")} /> */}
        <Select mt={5} {...register("options")}>
          <option value="one">One</option>
          <option value="tow">Two</option>
          <option value="three">Three</option>
        </Select>
        <Stack direction="row" spacing={4} justify="center" mt={5}>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
          <Button onClick={() => setFieldValue("email", "antonio@silva.com")}>
            set email value
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
