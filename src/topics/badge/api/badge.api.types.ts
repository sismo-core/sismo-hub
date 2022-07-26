import { BigNumberish } from "ethers";

/**
 * @description An object that represents a Badge Object for the end user using the api.
 */
export type BadgeAPIType = {
  collectionId: BigNumberish;
  metadata: {
    name: string;
    description: string;
    requirements: string[];
    image: string;
  };
};
