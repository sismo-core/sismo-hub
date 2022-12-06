import { AxiosRequestHeaders, Method } from "axios";

export type ApiConfig = {
  // `url` is the api URL that will be used for the request
  url: string;

  // `method` is the request method to be used when making the request
  method?: Method;

  // `headers` is the headers of your axios request, where you can add your authentification token
  headers?: AxiosRequestHeaders;

  // `data` is the data to be sent as the request body
  data?: object;
};
