/**
 * @param context  Context
 * @param request  Request function
 * @param cursor  Request function
 * @param retry Number of retry
 */
export const retryRequest = async (request: any) => {
  const retry = 5;
  for (let i = 0; i < retry; i++) {
    try {
      return await request;
    } catch (error: any) {
      await new Promise((resolve: any) => setTimeout(resolve, 20000));
    }
  }
  throw new Error("Max retry reached");
};
