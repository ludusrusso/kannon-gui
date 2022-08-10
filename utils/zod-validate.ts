import { z } from "zod";

export const zodValidate =
  <T = any>(schema: z.Schema<T>) =>
  (values: T) => {
    try {
      schema.parse(values);
      return {};
    } catch (e) {
      const err = e as z.ZodError;
      const res = err.errors.reduce(
        (prev, e) => mergePath(prev, e.path, e.message),
        {}
      );
      return res;
    }
  };

const mergePath = (
  original: any = undefined,
  path: (string | number)[],
  value: any
): any => {
  original = getDefatul(original, path);
  if (path.length === 0) {
    return value;
  }
  const idx = path[0];
  original[idx] = mergePath(original[idx], path.slice(1), value);
  return original;
};

const getDefatul = (original: any, path: (string | number)[]): any => {
  if (original !== undefined) {
    return original;
  }
  if (isNaN(Number(path[0]))) {
    return {};
  } else {
    return [];
  }
};
