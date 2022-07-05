import axios from "axios";
import { Group } from "../group";

export const getGroups = async (filter: {
  generatorName: string;
  timestamp: number | "latest";
}): Promise<Group[]> => {
  const GROUPS_API_URL =
    process.env.GROUPS_API_URL ?? `https://source-api.sismo.io/groups`;
  const res = await axios.get(GROUPS_API_URL, {
    params: {
      timestamp: filter.timestamp,
      generatorName: filter.generatorName,
    },
  });
  return res.data.items.map(async (item: any) => {
    const res = await axios.get(item.data.storeReference.uri);
    return new Group({
      generationDate: new Date(item.generationDate),
      tags: item.tags,
      generatorName: item.generatorName,
      valueType: item.valueType,
      data: res.data,
    });
  });
};
