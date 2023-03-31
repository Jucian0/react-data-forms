import { createForm } from "@createform/react";
import { Button, Input, Select, Stack } from "@chakra-ui/react";

const useLoginForm = createForm({
  initialValues: {
    email: "",
    password: "",
    options: "three",
    range: 10,
  },
  mode: "onSubmit",
});

export function FormExample() {
  const { register, handleReset, handleSubmit, setFieldValue } = useLoginForm();

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
        <Input mt={5} type="text" {...register("email")} />
        <Input mt={5} type="password" {...register("password")} />
        <Input type="range" {...register("range")} />
        <Select {...register("options")}>
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
