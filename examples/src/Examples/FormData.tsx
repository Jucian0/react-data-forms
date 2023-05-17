import { Button, Input, Stack } from "@chakra-ui/react";
import React from "react";

const data = {
  name: "juciano",
  lastname: "barbosa",
  email: "juciano@juciano.com",
};

export function FormDataWay() {
  const form = React.useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log(formData.getAll("name"));
  }

  React.useEffect(() => {
    if (form.current) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const inputElement = form.current.elements.namedItem(
            key
          ) as HTMLInputElement;
          inputElement.value = (data as any)[key];
        }
      }
    }
  }, [form]);

  return (
    <Stack p={40}>
      <form onSubmit={onSubmit} ref={form}>
        <Input name="name" />
        <Input name="lastname" />
        <Input name="email" type="email" />
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Stack>
  );
}
