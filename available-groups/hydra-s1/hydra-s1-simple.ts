import { Group } from "../../src/group";
import poolyLawyerMinters from "../../group-generators/generators/pooly-lawyer-minters";
import sismoCitizens from "../../group-generators/generators/sismo-citizens";
import sismoDiggers from "../../group-generators/generators/sismo-diggers";
import sismoGuests from "../../group-generators/generators/sismo-guests";
import poolyMinters from "../../group-generators/generators/pooly-minters";

export const hydraS1SimpleGroups = async (): Promise<Group[][]> => {
  return [
    [await sismoDiggers.getLatestGroup()],
    [await sismoCitizens.getLatestGroup()],
    // [],
    [await sismoGuests.getLatestGroup()],
    [await poolyMinters.getLatestGroup()],
    [await poolyLawyerMinters.getLatestGroup()],
  ];
};
