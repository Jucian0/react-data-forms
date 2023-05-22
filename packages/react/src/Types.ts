export type StateChange<T> = T | ((state: T) => T);

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
