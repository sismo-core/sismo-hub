import { Group, GroupMetadata, GroupWithData } from "./group.types";

export const groupMetadata = (group: Group | GroupWithData): GroupMetadata => ({
  name: group.name,
  timestamp: group.timestamp,
  generatedBy: group.generatedBy,
  accountSources: group.accountSources,
  properties: group.properties,
  valueType: group.valueType,
  tags: group.tags,
});
