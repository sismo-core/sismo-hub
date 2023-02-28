/**
 * @param context  Context
 * @param request  Request function
 * @param cursor  Request function
 * @param retry Number of retry
 */
export const retryRequest = async (request: any, iterations=5, wait=10000) => {
  for (let i = 0; i < iterations; i++) {
    try {
      return await request;
    } catch (error: any) {
      console.log(error);
      await new Promise((resolve: any) => setTimeout(resolve, wait));
    }
  }
  throw new Error("Max retry reached");
};
