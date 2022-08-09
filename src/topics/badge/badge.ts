import { Network } from "topics/attester";

export type BadgeMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: string[];
  requirements: string[];
};

export type Badge = BadgeMetadata & {
  collectionId: string;
  network: Network;
};
