import each from 'jest-each';
import { waitFor } from '@testing-library/react';
import { validate } from '../src/Validate';
import { z } from 'zod';
import * as yup from 'yup';
import { makeMockedValues } from './Utils';

async function makeSut(state = {}, validationSchema: any) {
  const sut = await validate(state, validationSchema);

  return {
    sut,
  };
}

const validations = {
  zod: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
  yup: yup.object({
    name: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required(),
  }),
};

describe('Store', () => {
  each(['zod', 'yup']).it(
    'Should return an promise with errors - [%s] mode',
    async (mode: keyof typeof validations) => {
      const initialState = {};

      await makeSut(initialState, validations[mode]).catch((err) => {
        expect(err).toHaveProperty('name');
      });
    }
  );

  each(['zod', 'yup']).it.only(
    'Should return an promise with empty object - [%s] mode',
    async (mode: keyof typeof validations) => {
      const initialState = makeMockedValues();

      await makeSut(initialState, validations[mode]).catch((err) => {
        expect(err).not.toHaveProperty('name');
      });
    }
  );
});
