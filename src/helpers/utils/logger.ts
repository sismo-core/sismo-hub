export const logger = (...message: any) => {
  if (process.env.LOG == "true") {
    console.log(...message);
  }
};
