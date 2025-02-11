export const removeEmpty = (obj: Record<string, string>): Record<string, string> => {
  return Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce(
      //@ts-expect-error: any
      (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? removeEmpty(v) : v }),
      {}
    );
};
