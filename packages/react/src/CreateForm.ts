import React from "react";
import { createStore } from "./Store";
import {
  CreateFormArgs,
  Errors,
  EventChange,
  Field,
  FieldPath,
  FieldPathValue,
  HookArgs,
  RegisterArgs,
  Touched,
  Values,
} from "./Types";
import * as Dot from "@createform/object-utils";
import { extractRadioElements, isCheckbox, isRadio } from "./FieldsUtils";
import { validate } from "@createform/validation";
import { StateChange } from ".";
import { debounce } from "./Debounce";

const defaultValues = {
  initialValues: {},
  initialErrors: {},
  initialTouched: {},
};

/**
 * createForm function create a form Store and return a hook that can be used to manage the form state.
 * @param args CreateFormArgs type that contains the initial values of form, initial errors of form, initial touched of form,
 * @returns {function(*): *} a function that returns a hook that can be used to manage the form state.
 **/
export function createForm<T extends CreateFormArgs<Values<T>>>(args: T) {
  const { initialValues, initialErrors, initialTouched, validationSchema } = {
    ...defaultValues,
    ...args,
  };

  const mode = args.mode === "debounce" ? "onChange" : args.mode;
  const shouldNotify = mode === "onChange";
  const debouncedTime = args.mode === "debounce" ? 500 : 0;
  /**
   * This is the store of the form,
   * it is an object that contains the values of form,
   * errors of form,
   * touched of form.
   **/
  const $store = createStore({
    values: initialValues,
    errors: initialErrors,
    touched: initialTouched,
    isValid: Dot.isEmpty(initialErrors),
    isTouched: !Dot.isEmpty(initialTouched),
  });

  /**
   * This is the reference of all native inputs of the form,
   * in order to have the same reference of all inputs of the form.
   **/
  const inputsRefs = {} as { [k: string]: React.RefObject<any> };

  return (hookArgs?: HookArgs<Values<T>>) => {
    const state = React.useSyncExternalStore(
      (fn) => $store.subscribe(debounce(fn, debouncedTime)),
      $store.get,
      $store.get
    );

    /**
     * This function will handle change events of the form,
     * @param event the event that will be handled
     **/
    async function handleChange(event: EventChange) {
      const { name, value, checked } = event.target;

      const nextValue =
        event.detail !== undefined && (event as any).detail !== 0
          ? event.detail
          : value;

      if (isCheckbox(event.target as Field)) {
        $store.patch(`values.${name}`, checked).notify(shouldNotify);
      } else {
        $store.patch(`values.${name}`, nextValue).notify(shouldNotify);
      }

      if (hookArgs?.onChange) {
        hookArgs.onChange($store.getPropertyValue("values"));
      }
    }

    /**
     * This function will handle blur events
     * @param event the event that will be handled
     **/
    async function handleBlur(event: EventChange) {
      const { name } = event.target;
      const state = $store.get();

      if (hookArgs?.onBlur) {
        hookArgs.onBlur($store.getPropertyValue("values"));
      }

      if (validationSchema) {
        const validationResult = await handleValidate(validationSchema);
        const next = Dot.set(
          { ...state, ...validationResult },
          `touched.${name}`,
          true
        );
        $store.set(next).notify(shouldNotify);
      } else {
        $store.patch(`touched.${name}`, true).notify(shouldNotify);
      }
    }

    async function handleValidate(validationSchema: any) {
      try {
        await validate($store.getPropertyValue("values"), validationSchema);
        return { errors: {}, isValid: true };
      } catch (errors: any) {
        return { errors, isValid: false };
      }
    }

    function setFieldRefValue(name: string, value: any) {
      const ref = inputsRefs[name];

      if (ref && ref.current) {
        if (isCheckbox(ref.current)) {
          ref.current.checked = value;
        } else if (isRadio(ref.current)) {
          setRadioRefValue(ref, value);
        }
        ref.current.value = value;
      }
    }

    function setRadioRefValue(ref: any, value: string) {
      const radios = extractRadioElements(ref.current);
      for (const radio of radios) {
        radio.checked = radio.value === value;
      }
    }

    function setAllFieldsState(nextFieldState: any) {
      let next = {};

      for (const key in inputsRefs) {
        if (inputsRefs[key]) {
          next = Dot.set(next, key, nextFieldState);
        }
      }
      return next;
    }

    /**
     * Registers a field and returns its properties.
     * @function
     * @param {RegisterArgs} args - The properties of the field to register.
     * @returns {Object} An object with the properties for the field, including the `ref`, `onBlur` and `onChange` handlers.
     *
     * @example
     *
     * return (
     *   <input
     *     {...register({ name: 'username', type:'text', placeholder:'Enter your username' })}
     *   />
     * );
     *
     * or
     *
     * return (
     *   <input
     *     {...register('username')}
     *     type="text"
     *     placeholder="Enter your username"
     *   />
     * );
     */
    function register(args: RegisterArgs<Values<T>>) {
      let props = {} as any;

      if (typeof args === "object") {
        props = args;
      } else {
        props = {
          name: args,
        };
      }

      const defaultValue = Dot.get(state.values, props?.name) || "";
      const ref = React.useRef(null);

      React.useEffect(() => {
        if (ref.current) {
          inputsRefs[props.name] = ref;
          setFieldRefValue(props.name, defaultValue);
        }
      }, [ref]);

      React.useEffect(() => {
        if (ref.current && props.validate) {
          handleInlineValidation(defaultValue);
        }
      }, [ref]);

      async function handleInlineValidation(value: any) {
        try {
          await validate(value, props.validate);
          $store.patch(`errors.${props.name}`, undefined);
        } catch (error: any) {
          $store.patch(`errors.${props.name}`, error.message);
        }
      }

      function onBlur(e: EventChange) {
        handleBlur(e);
        if (props.validate) {
          handleInlineValidation(e.target.value);
        }
      }

      function onChange(e: EventChange) {
        handleChange(e);
      }

      return {
        ...props,
        ref,
        onBlur,
        onChange,
      };
    }

    /**
     * Handle form submit event.
     * @template T
     * @param {(values: T['initialValues'], isValid: boolean) => void} submit - * * * * Callback function to handle submit event
     * @throws {Error} If submit parameter is not a function
     * @returns {(event: React.FormEvent<HTMLFormElement>) => Promise<void>} An async * function that handles submit event
     */
    function handleSubmit(
      submit: (values: Values<T>, isValid: boolean) => void
    ): (event: React.FormEvent<HTMLFormElement>) => Promise<void> {
      if (typeof submit !== "function") {
        throw Error("Submit function is required");
      }
      /**
       * Handle form submit event.
       * @param {React.FormEvent<HTMLFormElement>} event - The form submit event
       * @returns {Promise<void>}
       */
      return async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        $store.patch("touched", setAllFieldsState(true));
        $store.patch("isTouched", true);

        if (validationSchema) {
          const validationResult = await handleValidate(validationSchema);
          const state = $store.get();
          $store.set({ ...state, ...validationResult }).notify();
          submit(state.values, validationResult.isValid);
        } else {
          const state = $store.get();
          const isValid = Dot.isEmpty(state.errors);
          $store.set({ ...state, isValid }).notify();
          submit(state.values, isValid);
        }
      };
    }

    /**
     * Handle form reset event.
     * @template T
     * @param {(values: T['initialValues']) => void} reset - Callback function to handle reset event
     * @throws {Error} If reset parameter is not a function
     * @returns {(event: React.FormEvent<HTMLFormElement>) => void} A function that handles reset * * event
     */
    function handleReset(reset: (values: Values<T>) => void) {
      if (typeof reset !== "function") {
        throw Error("Reset function is required");
      }
      /**
       * This function will handle reset event
       * @param event the event that will be handled
       **/
      return (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        resetForm();

        reset(initialValues);
      };
    }

    /**
     * Resets the form by setting initial values, errors, touched state, and field values.
     * Notifies the $store after resetting the form.
     */
    function resetForm() {
      $store
        .set({
          values: initialValues,
          errors: initialErrors,
          touched: initialTouched,
          isValid: Dot.isEmpty(initialErrors),
          isTouched: Dot.isEmpty(!initialTouched),
        })
        .notify();

      for (const key in inputsRefs) {
        const value = Dot.get(initialValues, key) || "";
        setFieldRefValue(key, value);
      }
    }

    /**
     * Set the value of a specific field in the form.
     * @param {string} name - Name of the field
     * @param {any} value - Value to set the field to
     */
    function setFieldValue<N extends FieldPath<Values<T>>>(
      name: N,
      value: FieldPathValue<Values<T>, N>
    ): void {
      try {
        setFieldRefValue(name, value);
        $store.patch(`values.${name}`, value).notify(shouldNotify);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Set the values of multiple fields in the form.
     * @template T
     * @param {StateChange<T['initialValues']>} next - Object containing updated field values or a * function to produce updated field values
     */
    function setFieldsValue(next: StateChange<Values<T>>) {
      //@ts-ignore
      const nextValues = typeof next === "function" ? next(state.values) : next;
      try {
        for (const key in inputsRefs) {
          setFieldRefValue(key, next);
        }

        $store.patch("values", nextValues).notify(shouldNotify);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Set error message for a specific field in the form.
     * @param {Paths<Values<T>>} name - Name of the field
     * @param {string} message - Error message to set for the field
     */
    function setFieldError<N extends FieldPath<Values<T>>>(
      name: N,
      message: string
    ): void {
      try {
        $store.patch(`errors.${name}`, message).notify(shouldNotify);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Set error messages for multiple fields in the form.
     * @param {StateChange<Errors<T['initialValues']>>} next - The updated error messages. Can be * * either an object or a function that returns an object.
     */
    function setFieldsError(next: StateChange<Errors<Values<T>>>): void {
      const nextErrors =
        typeof next === "function" ? next($store.get().errors) : next;
      try {
        $store.patch("errors", nextErrors).notify(shouldNotify);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * This function will set the touched value of a field.
     * @param {Paths<Values<T>>} name the name of the field to set
     * @param {boolean} value the new value of the field, default is true
     **/
    function setFieldTouched<N extends FieldPath<Values<T>>>(
      name: N,
      value = true
    ): void {
      try {
        $store.patch(`touched.${name}`, value).notify(shouldNotify);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Set the touched state of multiple fields in the form.
     * @template T
     * @param {StateChange<T['initialValues']>} next - Object containing updated field touched state or a * function to produce updated field touched states
     */
    function setFieldsTouched(next: StateChange<Touched<Values<T>>>) {
      const nextTouched =
        typeof next === "function" ? next($store.get().touched) : next;
      try {
        $store.patch("touched", nextTouched).notify(shouldNotify);
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * Resets the values of fields to the initial values.
     * @function
     */
    function resetValues() {
      setFieldsValue(initialValues as Values<T>);
    }

    /**
     * Resets the errors of fields to the initial errors.
     * @function
     */
    function resetErrors() {
      $store
        .patch("errors", initialErrors as Errors<T["initialErrors"]>)
        .notify(shouldNotify);
    }

    /**
     * Resets the touched status of fields to the initial status.
     * @function
     */
    function resetTouched() {
      $store
        .patch("touched", initialTouched as Touched<T["initialTouched"]>)
        .notify(shouldNotify);
    }

    return {
      $form: $store,
      state,
      register,
      handleReset,
      handleSubmit,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      setFieldsValue,
      setFieldsError,
      setFieldsTouched,
      resetErrors,
      resetTouched,
      resetValues,
      resetForm,
    };
  };
}
