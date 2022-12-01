import { HydraS1GroupPropertiesEncoder } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder/group-properties-encoder";
import { AttestationsCollection } from "topics/attester";
import { Group } from "topics/group";

export const hydraS1GroupPropertiesEncoders = {
  hydraS1Encoder: (
    attestationsCollection: Omit<AttestationsCollection, "groupFetcher">,
    group: Group
  ) => new HydraS1GroupPropertiesEncoder(attestationsCollection, group),
};
