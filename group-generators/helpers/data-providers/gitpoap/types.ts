
export type GitPoap = {
  gitPoapId: number,
  gitPoapEventId: number,
  poapTokenId: number,
  poapEventId: number,
  poapEventFancyId: string,
  name: string,
  year: number,
  description:  string,
  imageUrl: string,
  repositories: string,
  earnedAt: Date,
  mintedAt:  Date
};


export type GitPoapAddresses = {
  addresses: string[],
}