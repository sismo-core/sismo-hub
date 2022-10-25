import { AccountBoundGroupPropertiesEncoder } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { SimpleGroupPropertiesEncoder } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder/simple-group-properties-encoder";
import { AttestationsCollection } from "topics/attester";
import { Group } from "topics/group";
import { GroupProperties } from "topics/group-properties-encoder";

export interface HydraS1GroupProperties extends GroupProperties {
  generationTimestamp: number;
  isScore: boolean;
}

export const hydraS1GroupPropertiesEncoders = {
  accountboundEncoder: (
    attestationsCollection: Omit<AttestationsCollection, "groupFetcher">,
    group: Group
  ) => new AccountBoundGroupPropertiesEncoder(attestationsCollection, group),
  simpleEncoder: (
    attestationsCollection: Omit<AttestationsCollection, "groupFetcher">,
    group: Group
  ) => new SimpleGroupPropertiesEncoder(attestationsCollection, group),
};
