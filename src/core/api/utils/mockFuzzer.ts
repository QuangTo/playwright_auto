export const withExtrasData = <T>(base: T): T & Record<string, any> => {
  const extras: Record<string, any> = {};
  const key = 'fuzz_' + Math.random().toString(20).substring(2, 8);
  const value = Math.random().toString(20).substring(2, 8);
  extras[key] = value;
  return { ...base, ...extras };
};
