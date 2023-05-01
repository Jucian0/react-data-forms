import React from "react";
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

export type Values<T extends CreateFormArgs<T["initialValues"]>> =
  T["initialValues"];

/**
 * useForm hook needs an object that describe and provide some properties like initial values of form, initial errors of form, initial touched of form,
 * and needs know what kind of form, is Controlled, debounced is about that.
 */
export type CreateFormArgs<T> = {
  /** represents a initial value of form */
  readonly initialValues?: T;
  /** represents a initial values of inputs errors */
  readonly initialErrors?: Errors<T>;
  /** represents a initial values of visited inputs */
  readonly initialTouched?: Touched<T>;
  /** validation schema provided by yup */
  readonly validationSchema?: any; //YupSchema<T>

  readonly mode?: "debounce" | "onChange" | "onSubmit";
};

/**
 * KeyValue type represents a key value object that has a key and a value.
 * It' helpful to use this type when you want to use a key value object as a key of an object.
 **/
export type KeyValue<T> = {
  [k: string]: T;
};

/**
 * Inputs types
 **/
export type PrimitiveValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

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

export type StateChange<T> = T | ((state: T) => T);

export type StateOfField = "values" | "touched" | "errors";

export type RegisterArgs<T> =
  | (React.InputHTMLAttributes<Field> & {
      validate?: any;
      name: Paths<T>;
    })
  | Paths<T>;

export type FieldName<T extends CreateFormArgs<T>> = Values<T>;

/**
 * Get the value path, and turn it into a type.
 */
type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"]
  ? false
  : true;

type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

type ArrayKey = number;

type PathImpl<K extends string | number, V> = V extends PrimitiveValue
  ? `${K}`
  : `${K}` | `${K}.${Paths<V>}`;

export type Paths<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
      }[TupleKey<T>]
    : PathImpl<ArrayKey, V>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K]>;
    }[keyof T];

/**
 * turn the field path into a type, it's used to define the correct type in function that receive the field path.
 * example : setFieldError(`person.name`, `error message`)
 */
export type FieldPath<TFieldValues extends FieldValues> = Paths<TFieldValues>;

export type FieldValues = any;

type ArrayPathImpl<K extends string | number, V> = V extends PrimitiveValue
  ? never
  : V extends ReadonlyArray<infer U>
  ? U extends PrimitiveValue
    ? never
    : `${K}` | `${K}.${ArrayPath<V>}`
  : `${K}.${ArrayPath<V>}`;

export type ArrayPath<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: ArrayPathImpl<K & string, T[K]>;
      }[TupleKey<T>]
    : ArrayPathImpl<ArrayKey, V>
  : {
      [K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
    }[keyof T];

export type PathValue<T, P extends Paths<T> | ArrayPath<T>> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? R extends Paths<T[K]>
        ? PathValue<T[K], R>
        : never
      : K extends `${ArrayKey}`
      ? T extends ReadonlyArray<infer V>
        ? PathValue<V, R & Paths<V>>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : P extends `${ArrayKey}`
    ? T extends ReadonlyArray<infer V>
      ? V
      : never
    : never
  : never;

/**
 * gets the property type form initial form values
 */
export type FieldPathValue<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>
> = PathValue<TFieldValues, TFieldPath>;
