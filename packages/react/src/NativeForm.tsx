import React from "react";
import * as D from "./ObjectUtils";
import { CreateFormArgs, Values } from "./Types";
import { validate } from "./Validate";

const defaultValues = {
  initialValues: {},
  initialErrors: {},
};

type NativeFormArgs<T> = Omit<CreateFormArgs<T>, "initialTouched"> & {
  onSubmit?: (e: T) => void;
  onReset?: (e: T) => void;
};

export function useNativeForm<T extends NativeFormArgs<Values<T>>>(args: T) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const { initialValues, initialErrors, validationSchema } = {
    ...defaultValues,
    ...args,
  };
  const [errors, setErrors] = React.useState(initialErrors);

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    if (validationSchema) {
      try {
        await validate(D.formDataToJson(formData) as {}, validationSchema);
      } catch (errors: any) {
        setErrors(errors);
      }
    }
    args.onSubmit?.(D.formDataToJson(formData));
  }

  async function handleOnReset(e: React.FormEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    args.onReset?.(formData);

    if (validationSchema) {
      try {
        await validate(D.formDataToJson(formData) as {}, validationSchema);
      } catch (errors: any) {
        setErrors(errors);
      }
    }
  }

  React.useEffect(() => {
    if (formRef.current) {
      Array.from(formRef.current.elements).forEach((element) => {
        if (element.tagName === "INPUT") {
          const inputElement = element as HTMLInputElement;

          if (
            inputElement.type === "checkbox" ||
            inputElement.type === "radio"
          ) {
            inputElement.defaultChecked = D.get(
              initialValues,
              inputElement.name
            );
          } else {
            inputElement.defaultValue = D.get(initialValues, inputElement.name);
          }
        } else if (element.tagName === "SELECT") {
          const selectElement = element as HTMLSelectElement;
          Array.from(selectElement.options).findIndex((element) => {
            if (element.value === D.get(initialValues, selectElement.name)) {
              element.defaultSelected = true;
            }
          });
        }
      });
    }
  }, [formRef]);

  return {
    register: () => ({
      ref: formRef,
      onSubmit: handleOnSubmit,
      onReset: handleOnReset,
    }),
    errors,
  };
}
