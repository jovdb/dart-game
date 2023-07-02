export const waitAsync = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));