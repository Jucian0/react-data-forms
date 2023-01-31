import { createForm } from '@createform/react';

export type Person = {
  firstName: string;
  lastName: string;
  age: number | null;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
};

export const usePersonForm = createForm({
  initialValues: {
    firstName: '',
    lastName: '',
    age: null,
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
  },
  mode: 'debounce',
});
