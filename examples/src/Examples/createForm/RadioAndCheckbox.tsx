import { createForm } from "@createform/react";
import { Button, Stack } from "@chakra-ui/react";
import React from "react";

const useLoginForm = createForm({
  initialValues: {
    agree: true,
    gender: "masc",
  },
  mode: "onSubmit",
});

export function RadioAndCheckboxExample() {
  const { state, register, handleReset, handleSubmit, setFieldValue } =
    useLoginForm();

  console.log("state", state.values, "changed");

  function onSubmit(e: any) {
    console.log(e);
  }

  function onReset(e: any) {
    console.log(e);
  }

  return (
    <Stack p={30}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset(onReset)}>
        <label htmlFor="agree">
          <input type="checkbox" {...register("agree")} />
          Agree
        </label>
        <div {...register("gender")}>
          <input type="radio" name="gender" id="1" value="masc" />
          Masc
          <input type="radio" name="gender" id="2" value="fem" />
          Fem
          <input type="radio" name="gender" id="2" value="other" />
          Other
        </div>

        <Stack direction="row" spacing={4} justify="center" mt={5}>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>

          <Button onClick={() => setFieldValue("gender", "masc")}>
            set gender value
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
