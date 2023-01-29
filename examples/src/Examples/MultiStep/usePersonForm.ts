import { createForm } from '@use-form/use-form';

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
