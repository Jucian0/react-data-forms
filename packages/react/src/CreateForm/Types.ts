import React from "react";
import { Paths, PrimitiveValue } from "../Types";
import { Store } from "./Store";

/**
 * state is one of properties that is returned by useForm hook, this object contains the current state of form when the form is controlled or debounced.
 */
export type State<T> = {
  values: T;
  errors: Errors<T>;
  touched: Touched<T>;
  isValid: boolean;
};

/**
 * Touched type represents a touched object that has all properties of a form values, when this properties is primitive type ww convert this in a boolean,
 *  otherwise if this an object we start again validating every properties.
 */
export type Touched<Values> = {
  [k in keyof Values]?: Values[k] extends number | string | boolean | Date
    ? boolean
    : Values[k] extends Array<any>
    ? Touched<Values[k][number]>[]
    : Touched<Values[k]>;
};

/**
 * Errors type represents a errors object that has all properties of a form values, when this properties is primitive type ww convert this in a string,
 *  otherwise if this an object we start again validating every properties.
 */
export type Errors<Values> = {
  [k in keyof Values]?: Values[k] extends number | string | boolean | Date
    ? string
    : Values[k] extends Array<any>
    ? Errors<Values[k][number]>[]
    : Errors<Values[k]>;
};

export type Values<T extends Record<string, any>> = T["values"];

/**
 * useForm hook needs an object that describe and provide some properties like initial values of form, initial errors of form, initial touched of form,
 * and needs know what kind of form, is Controlled, debounced is about that.
 */
export type CreateState<T> = {
  /** represents a initial value of form */
  readonly values?: T;
  /** represents a initial values of inputs errors */
  readonly errors?: Errors<T>;
  /** represents a initial values of visited inputs */
  readonly touched?: Touched<T>;
  /** validation schema provided by yup */
  readonly validationSchema?: any; //YupSchema<T>

  readonly mode?: "debounce" | "onChange" | "onSubmit";

  preload?: <A>(arg: A) => Promise<any>;

  submit?: (values: T) => Promise<any>;
};

export type CreateFormFN<T> = ({
  set,
  get,
}: {
  set: Store<T>["set"];
  get: Store<T>["get"];
}) => CreateState<T>;

// const useForm = createForm(({ set }) => ({
//   values: {},
//   errors: {},
//   touched: {},
//   mode: "onChange",
//   preload: async (id) => {
//     try {
//       const data = await serviceGet(id); //set({values: {}});
//       set(data);
//     } catch (e) {
//       return await set({ values: {} });
//     }
//   },
//   submit: async (id) => {
//     try {
//       if (id) {
//         await servicePatch(id);
//       } else {
//         await servicePost();
//       }
//     } catch (e) {
//       return await set({ errors: e });
//     }
//   },
// }));

/**
 * KeyValue type represents a key value object that has a key and a value.
 * It' helpful to use this type when you want to use a key value object as a key of an object.
 **/
export type KeyValue<T> = {
  [k: string]: T;
};

export type Checkbox = HTMLInputElement;

export type Radio = HTMLInputElement;

export type Select = HTMLSelectElement;

export type Text = HTMLInputElement;

export type TextArea = HTMLTextAreaElement;

export type PrimitiveEvent = EventTarget & {
  value: PrimitiveValue;
};

export type Field = Checkbox &
  Radio &
  Select &
  Text &
  TextArea &
  PrimitiveEvent;

export type Mode = "onChange" | "onSubmit" | "debounce";

export type HookArgs<T> = {
  onChange?: (state: T) => T | void;
  onBlur?: (state: T) => T | void;
  onSubmit?: (state: T) => T | void;
  mode?: Mode;
};

export type EventChange = React.ChangeEvent<Field> & CustomEvent<Field> & Event;

export type RegisterArgs<T> =
  | (React.InputHTMLAttributes<Field> & {
      validate?: any;
      name: Paths<T>;
    })
  | Paths<T>;

export type FieldName<T extends CreateState<T["values"]>> = Values<T>;
