export type Account = {
  accountIdentifier: string;
  groupIds: string[]
};

export type Result = {
  total?: number,
  failed?: number,
  retry?: number,
  successful?: number,
  time?: number,
  bytes?: number,
  aborted?: boolean
};