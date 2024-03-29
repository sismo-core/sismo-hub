// Badge curation follows this framework
// https://sismo.notion.site/ZK-Badge-Attributes-Assessment-Framework-32ec230f741047519cda040ce2396f37

export const enum BadgeAttribute {
  PRIVACY = "PRIVACY",
  TRUSTLESSNESS = "TRUSTLESSNESS",
  SYBIL_RESISTANCE = "SYBIL_RESISTANCE",
}

export const badgeAttributeIndexes: { [attributeName: string]: number } = {
  [BadgeAttribute.PRIVACY]: 1,
  [BadgeAttribute.TRUSTLESSNESS]: 2,
  [BadgeAttribute.SYBIL_RESISTANCE]: 3,
};

export const enum BadgeAttributeValue {
  VERY_HIGH = "Very High",
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export const badgeAttributeValues = {
  [BadgeAttributeValue.VERY_HIGH]: 4,
  [BadgeAttributeValue.HIGH]: 3,
  [BadgeAttributeValue.MEDIUM]: 2,
  [BadgeAttributeValue.LOW]: 1,
};
