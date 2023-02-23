/**
 * @param context  Context
 * @param request  Request function
 * @param cursor  Request function
 * @param retry Number of retry
 */
export const retryRequest = async (context: any, request: any, cursor: any, retry: number) => {
  let error;
  for (let i = 0; i < retry; i++) {
    try {
      return await request(context, cursor);
    } catch (err: any) {
      await new Promise((resolve: any) =>
      setTimeout(resolve, 15000));
    }
  }
  throw new Error("Max retry reached\n" + error);
};