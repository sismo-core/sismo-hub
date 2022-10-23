export type SuccessResponse = {
  status: string,
  stats: {
    count: number,      // number of results returned
    size: number,     // total results size in kilobytes
    time: number,    // query time in milliseconds
  },
  results: []
};

export type ErrorResponse = {
    status: string,
    message: string
};

export type TokenHolder = {
    owner_address: string,
    balance: number
};