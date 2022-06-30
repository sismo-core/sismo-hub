export type timestampFiltering = {
  timestamp?: "latest" | number;
  since?: number;
  until?: number;
};

export const getTimestampFromDate = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

export const convertToNumber = (timestamp?: string): number | undefined => {
  if (timestamp === undefined) {
    return undefined;
  }
  return parseInt(timestamp);
};
