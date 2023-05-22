import { FieldPath, FieldPathValue, StateChange } from "../Types";

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

export type UseForm<T extends UseFormArgs<Values<T>>> = {
  register: () => {
    ref: React.RefObject<HTMLFormElement>;
    onSubmit: (e: React.FormEvent) => void;
    onReset: (e: React.FormEvent) => void;
  };
  setFieldValue: <N extends FieldPath<Values<T>>>(
    name: N,
    value: FieldPathValue<Values<T>, N>
  ) => void;
  setFieldsValue: (next: StateChange<Values<T>>) => void;
  setFieldsError: (next: StateChange<Errors<Values<T>>>) => void;
  getValues: () => Values<T>;
  getErrors: () => Errors<Values<T>>;
  errors: Errors<Values<T>>;
};
