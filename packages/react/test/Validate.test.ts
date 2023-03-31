import each from "jest-each";
import { validate } from "../src/Validate";
import { z } from "zod";
import * as yup from "yup";
import { makeMockedValues } from "./Utils";
import { faker } from "@faker-js/faker";

async function makeSut(state = {}, validationSchema: any) {
  const sut = await validate(state, validationSchema);

  return {
    sut,
  };
}

describe("Oject validation", () => {
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
  each(["zod", "yup"]).it(
    "Should return an promise with errors - [%s] mode",
    async (mode: keyof typeof validations) => {
      const initialState = {};

      await makeSut(initialState, validations[mode]).catch((err) => {
        expect(err).toHaveProperty("name");
      });
    }
  );

  each(["zod", "yup"]).it(
    "Should return an promise with empty object - [%s] mode",
    async (mode: keyof typeof validations) => {
      const initialState = makeMockedValues();

      await makeSut(initialState, validations[mode]).catch((err) => {
        expect(err).not.toHaveProperty("name");
      });
    }
  );
});

describe("Value validation", () => {
  const validations = {
    zod: z.string().min(2),
    yup: yup.string().required(),
  };

  each(["zod", "yup"]).it(
    "Should return an promise with an error - [%s] mode",
    async (mode: keyof typeof validations) => {
      await makeSut("message", validations[mode]).catch((err) => {
        expect(err).toHaveProperty("message");
      });
    }
  );

  each(["zod", "yup"]).it(
    "Should return an promise with empty undefined - [%s] mode",
    async (mode: keyof typeof validations) => {
      await makeSut(faker.datatype.string(), validations[mode]).catch((err) => {
        expect(err).not.toHaveProperty("message");
      });
    }
  );
});
