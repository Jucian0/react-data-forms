import { createForm } from "@createform/react";

export type Person = {
  firstName: string;
  lastName: string;
  age: number | null;
  date: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
};

export const usePersonForm = createForm({
  initialValues: {
    firstName: "",
    lastName: "",
    date: "",
    age: null,
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  },
  mode: "onChange",
});
