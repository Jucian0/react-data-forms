import { createForm } from '@use-form/use-form';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  firstName: yup.string().min(10).max(20),
  lastName: yup.string().min(10).max(20),
  age: yup.number().min(18),
  address: yup
    .object({
      street: yup.string().required(),
      city: yup.string().required(),
      zipCode: yup.string().required(),
    })
    .optional(),
});

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
  validationSchema,
  mode: 'onChange',
});
