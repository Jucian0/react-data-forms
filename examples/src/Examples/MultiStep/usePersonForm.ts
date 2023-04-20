import { createForm } from "@createform/react";

export type Person = {
  firstName: string;
  lastName: string;
  age: number | null;
  date: string;
  profession: any;
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
    profession: null,
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  },
  mode: "onChange",
});
