import React from "react";
import * as D from "@createform/object-utils";
import { validateSync } from "@createform/validation";
import { isRadioOrCheckbox, isSelect, setOptionAsDefault } from "./FieldsUtils";
import { Errors, UseForm, UseFormArgs, Values } from "./Types";
import { FieldPath, FieldPathValue, StateChange } from "../Types";

const defaultValues = {
  initialValues: {},
  initialErrors: {},
};

/**
 * Creates a form controller that handles form submission and reset events, and
 * provides functions to set form field values and errors, and retrieve form values
 * and errors.
 *
 * @template T - The shape of the form values object.
 * @param {UseFormArgs<Values<T>>} args - The arguments for the useForm function.
 * @return {Object} An object with the following properties:
 *   - register: A function that returns the form reference and the functions to handle
 *     form submission and form reset events.
 *   - setFieldValue: A function that sets the value of a form field with the given name
 *     to the provided value.
 *   - setFieldsValue: A function that sets the values of form fields.
 *   - setFieldsError: A function that sets errors for form fields.
 *   - getValues: A function that returns the values from a form as a JSON object.
 *   - getErrors: A function that returns the errors object after validating the form data
 *     by using the provided validation schema.
 *   - errors: The current errors object.
 */
export function useForm<T extends UseFormArgs<Values<T>>>(args: T): UseForm<T> {
  const formRef = React.useRef<HTMLFormElement>(null);

  const { initialValues, initialErrors, validationSchema } = {
    ...defaultValues,
    ...args,
  };
  const [errors, setErrors] = React.useState(initialErrors);

  /**
   * Handles form submission by preventing default form submission behavior,
   * parsing form data, validating it, setting errors if validation fails, and
   * calling the onSubmit function with the parsed data.
   *
   * @param {React.FormEvent} e - The form event that triggered the submission.
   * @return {void}
   */
  function handleOnSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    if (validationSchema) {
      const errors = validateSync(
        D.formDataToJson(formData) as {},
        validationSchema
      );
      setErrors(errors);
    }
    args.onSubmit?.(D.formDataToJson(formData));
  }

  /**
   * Handles the onReset event for a form by constructing a FormData object
   * from the form element and invoking the onReset callback with the data.
   * If a validation schema is provided, the component state is also updated
   * to reset any validation errors.
   *
   * @param {React.FormEvent} e - The form event object.
   * @return {void} Does not return anything.
   */
  function handleOnReset(e: React.FormEvent): void {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    args.onReset?.(formData);

    if (validationSchema) {
      setErrors(initialErrors);
    }
  }

  /**
   * Sets the value of a form field with the given name to the provided value.
   *
   * @template N Type of the field name.
   * @param {N} name - The name of the field.
   * @param {FieldPathValue<Values<T>, N>} value - The value to set the field to.
   * @return {void} This function does not return anything.
   */
  function setFieldValue<N extends FieldPath<Values<T>>>(
    name: N,
    value: FieldPathValue<Values<T>, N>
  ): void {
    const element = formRef.current?.elements?.namedItem(name) as Element;

    if (element && element.tagName === "INPUT") {
      const inputElement = element as HTMLInputElement;
      if (isRadioOrCheckbox(inputElement)) {
        inputElement.checked = value as any;
      } else {
        inputElement.value = value as any;
      }
    } else if (isSelect(element)) {
      setOptionAsDefault(element as HTMLSelectElement, value);
    }
  }
  /**
   * Sets the values of form fields.
   *
   * @param { StateChange<Values<T>>} next -
   *    The values to set on the form fields, or a function that takes the current values and returns
   *    the next values.
   */
  function setFieldsValue(next: StateChange<Values<T>>) {
    const currentValues = getValues();
    //@ts-ignore
    const nextValues = typeof next === "function" ? next(currentValues) : next;
    if (formRef.current) {
      setAllElementsValue(formRef.current, nextValues);
    }
  }

  /**
   * Sets errors for form fields.
   *
   * @param {StateChange<Errors<Values<T>>>} next - The new errors to set.
   * @return {void} This function does not return anything.
   */
  function setFieldsError(next: StateChange<Errors<Values<T>>>): void {
    const nextErrors = typeof next === "function" ? next(errors) : next;
    setErrors(nextErrors);
  }

  function setFieldError<N extends FieldPath<Values<T>>>(
    name: N,
    error: string
  ) {
    setErrors((errors) => D.set(errors, name, error));
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

  /**
   * Returns the values from a form as a JSON object.
   *
   * @return {Values<T>} The values from the form as a JSON object.
   */
  function getValues(): Values<T> {
    return D.formDataToJson(
      new FormData(formRef.current as HTMLFormElement)
    ) as Values<T>;
  }

  /**
   * Returns the errors object after validating the form data by using the provided validation schema.
   *
   * @return {object} The errors object returned after validating the form data.
   */
  function getErrors(): Errors<Values<T>> {
    return validateSync(
      D.formDataToJson(new FormData(formRef.current as HTMLFormElement)) as {},
      validationSchema
    );
  }

  /**
   * Returns an object containing the form reference and the functions to handle
   * form submission and form reset events.
   *
   * @return {Object} An object with the following properties:
   *   - ref: A reference to the form
   *   - onSubmit: A function to handle form submission event
   *   - onReset: A function to handle form reset event
   */
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
    setFieldsValue,
    setFieldsError,
    getValues,
    getErrors,
    errors,
  };
}
