import * as Dot from "@createform/object-utils";

export function makeDotNotation(str: string) {
  return str.split("[").join(".").split("]").join("");
}

export async function validate<TValues extends {}>(
  values: TValues,
  validationSchema: any
) {
  if (validationSchema?._def?.typeName) {
    return validationSchema
      .parseAsync(values)
      .then(() => {
        return {};
      })
      .catch((e: any) => {
        throw JSON.parse(e).reduce((acc: {}, key: any) => {
          const path = key.path.length > 0 ? key.path.join(".") : "message";
          return Dot.set(acc, path, key.message);
        }, {});
      });
  }

  return validationSchema
    ?.validate(values, { abortEarly: false })
    .then(() => {
      return {};
    })
    .catch((e: any) => {
      throw e.inner.reduce((acc: {}, key: any) => {
        const path = makeDotNotation(key.path || "message");
        return Dot.set(acc, path, key.message);
      }, {});
    });
}

export function validateSync<TValues extends {}>(
  values: TValues,
  validationSchema: any
) {
  if (validationSchema?._def?.typeName) {
    try {
      validationSchema.parse(values);
      return {};
    } catch (e) {
      return JSON.parse(e as any).reduce((acc: {}, key: any) => {
        const path = key.path.length > 0 ? key.path.join(".") : "message";
        return Dot.set(acc, path, key.message);
      }, {});
    }
  }
  try {
    validationSchema?.validateSync(values, { abortEarly: false });
    return {};
  } catch (e) {
    return (e as any).inner.reduce((acc: {}, key: any) => {
      const path = makeDotNotation(key.path || "message");
      return Dot.set(acc, path, key.message);
    }, {});
  }
}
