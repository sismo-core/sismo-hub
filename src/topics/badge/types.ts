import { BigNumberish } from "ethers";

export type ConstructedBadge = {
  collectionId: BigNumberish;
  metadata: {
    name: string;
    description: string;
    requirements: string[];
    image: string;
  };
};
