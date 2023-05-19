import { Button, Checkbox, Input, Select, Stack } from "@chakra-ui/react";
import { useNativeForm } from "@createform/react";

const data = {
  name: "juciano",
  lastname: "barbosa",
  email: "juciano@juciano.com",
  select: "option1",
  checkbox: true,
};

export function FormDataWay() {
  const { register } = useNativeForm({
    initialValues: data,
    onSubmit,
  });

  function onSubmit(e: typeof data) {
    console.log(e);
  }

  return (
    <Stack p={40}>
      <form {...register()}>
        <Stack p={5}>
          <Input name="name" />
        </Stack>
        <Stack p={5}>
          <Input name="lastname" />
        </Stack>
        <Stack p={5}>
          <Input name="email" type="email" />
        </Stack>

        <Stack p={5}>
          <input name="checkbox" type="checkbox" />
        </Stack>

        <Stack p={5}>
          <Select name="select" placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>
        <Stack p={5}>
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Stack>
  );
}
