/**
 * state is one of properties that is returned by useForm hook, this object contains the current state of form when the form is controlled or debounced.
 */
export type State<T> = {
  values: T;
  errors: Errors<T>;
  isValid: boolean;
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

export type Values<T extends UseFormArgs<T["initialValues"]>> =
  T["initialValues"];

/**
 * useForm hook needs an object that describe and provide some properties like initial values of form, initial errors of form, initial touched of form,
 * and needs know what kind of form, is Controlled, debounced is about that.
 */
export type UseFormArgs<T> = {
  /** represents a initial value of form */
  readonly initialValues?: T;
  /** represents a initial values of inputs errors */
  readonly initialErrors?: Errors<T>;
  /** validation schema provided by yup */
  readonly validationSchema?: any;
  /**
   * @param e the form values object
   */
  readonly onSubmit?: (e: T) => void;
  /**
   * @param e the form values object
   * */
  readonly onReset?: (e: T) => void;
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
