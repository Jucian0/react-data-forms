import React from "react";
import * as D from "@createform/object-utils";
import { validate, validateSync } from "@createform/validation";
import { isRadioOrCheckbox, isSelect, setOptionAsDefault } from "./FieldsUtils";
import { UseFormArgs, Values } from "./Types";

const defaultValues = {
  initialValues: {},
  initialErrors: {},
};

export function useNativeForm<T extends UseFormArgs<Values<T>>>(args: T) {
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
        setErrors({});
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
      setErrors(initialErrors);
    }
  }

  function setFieldValue(name: string, value: any) {
    const element = formRef.current?.elements?.namedItem(name) as Element;

    if (element && element.tagName === "INPUT") {
      const inputElement = element as HTMLInputElement;
      if (isRadioOrCheckbox(inputElement)) {
        inputElement.checked = value;
      } else {
        inputElement.value = value;
      }
    } else if (isSelect(element)) {
      setOptionAsDefault(element as HTMLSelectElement, value);
    }
  }

  function setAllElementsValue(formElement: HTMLFormElement, values = {}) {
    const elements = formElement.elements;
    const len = elements.length;
    for (let i = 0; i < len; i++) {
      const element = elements[i];
      if (element.tagName === "INPUT") {
        const inputElement = element as HTMLInputElement;

        if (isRadioOrCheckbox(inputElement)) {
          inputElement.defaultChecked = D.get(values, inputElement.name);
        } else {
          inputElement.defaultValue = D.get(values, inputElement.name);
        }
      } else if (isSelect(element)) {
        const selectElement = element as HTMLSelectElement;
        setOptionAsDefault(selectElement, D.get(values, selectElement.name));
      }
    }
  }

  function getValues() {
    return D.formDataToJson(
      new FormData(formRef.current as HTMLFormElement)
    ) as Values<T>;
  }

  function getErrors() {
    return validateSync(
      D.formDataToJson(new FormData(formRef.current as HTMLFormElement)) as {},
      validationSchema
    );
  }

  function register() {
    return {
      ref: formRef,
      onSubmit: handleOnSubmit,
      onReset: handleOnReset,
    };
  }

  React.useEffect(() => {
    if (formRef.current) {
      setAllElementsValue(formRef.current, initialValues);
    }
  }, [formRef]);

  return {
    register,
    setFieldValue,
    getValues,
    getErrors,
    errors,
  };
}
