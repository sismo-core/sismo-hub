import axios from "axios";
import { Group } from "../group";

export const getGroups = async (filter: {
  generatorName: string;
  timestamp: number | "latest";
}): Promise<Group[]> => {
  //q0lz26fdok.execute-api.eu-west-1.amazonaws.com/groups?timestamp=latest&generatorName=pooly-minters
  const res = await axios.get(
    `https://q0lz26fdok.execute-api.eu-west-1.amazonaws.com/groups`,
    {
      params: {
        timestamp: filter.timestamp,
        generatorName: filter.generatorName,
      },
    }
  );
  return res.data.items.map(async (item: any) => {
    const res = await axios.get(item.data.storeReference.uri);
    const group = new Group({
      generationDate: new Date(item.generationDate),
      tags: item.tags,
      generatorName: item.generatorName,
      valueType: item.valueType,
      data: res.data,
    });
    return group;
  });
};
