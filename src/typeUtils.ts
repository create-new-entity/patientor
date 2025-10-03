
export const assertNever = (value: unknown) => {
  throw new Error("Unexpected value: " + value);
};

export const isString = (text: unknown): text is string => {
    return (typeof text === 'string') || (text instanceof String);
};

const typeUtils = {
    isString,
    assertNever
};

export default typeUtils;