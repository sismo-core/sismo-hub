import axios from "axios";
import { LoggerService } from "logger";
import { BadgeMetadata } from "topics/badge";
import { Group, GroupStore } from "topics/group";

type DescriptionAndSpecs = {
  groupGeneratorName: string;
  description: string;
  specs: string;
};

type BadgeMetadataWithEligibility = BadgeMetadata & {
  eligibility: { shortDescription: string; specification: string };
  groupGeneratorName: string;
};

const URLS: { [name: string]: string } = {
  staging: "https://hub.staging.zikies.io",
  testnets: "https://hub.testnets.sismo.io",
  prod: "https://hub.sismo.io",
};

const fetchBadges = async (url: string): Promise<DescriptionAndSpecs[]> => {
  console.log(`Fetching badges from ${url}`);
  const response = await axios({
    url: `${url}/badges/`,
    method: "get",
  });

  const badges: BadgeMetadataWithEligibility[] = response.data.items;

  const descriptionAndSpecs = badges.map((badge) => {
    const { eligibility } = badge;
    const description = eligibility.shortDescription ?? "";
    const specs = eligibility.specification ?? "";
    return {
      groupGeneratorName: badge.groupGeneratorName,
      description,
      specs,
    };
  });
  return descriptionAndSpecs;
};

export const storeEligibilityDescriptionsInGroupsInsteadOfBadges = async ({
  groupStore,
  loggerService,
}: {
  groupStore: GroupStore;
  loggerService: LoggerService;
}) => {
  const badgesByEnv: { [name: string]: DescriptionAndSpecs[] } = {};

  await Promise.all(
    Object.keys(URLS).map(async (key: string) => {
      badgesByEnv[key] = await fetchBadges(URLS[key]);
    })
  );

  // open files and write to them based on group generator name
  const groupGeneratorsUpdated: {
    [groupGeneratorName: string]: {
      [groupName: string]: { description: string; specs: string };
    };
  } = {};

  const allGroups: Group[] = Object.values(await groupStore.all());
  for (const env of Object.keys(badgesByEnv)) {
    const badges = badgesByEnv[env];
    for (const badge of badges) {
      const { groupGeneratorName, description, specs } = badge;
      if (!groupGeneratorsUpdated[groupGeneratorName]) {
        groupGeneratorsUpdated[groupGeneratorName] = {};
      }
      // retrieve all groups with this group generator name
      // for each group, update the description and specs
      const groups = allGroups.filter(
        (group) => group.generatedBy === groupGeneratorName
      );
      for (const group of groups) {
        if (!groupGeneratorsUpdated[groupGeneratorName][group.name]) {
          loggerService.info(
            `Updating group ${group.name} with id ${group.id} 
with description -> ${description} 
and specs -> ${specs} ...`
          );
          // update the group on dynamoDB with update function
          await groupStore.update({
            ...group,
            description,
            specs,
            data: await group.data(),
            resolvedIdentifierData: await group.resolvedIdentifierData(),
          });
          groupGeneratorsUpdated[groupGeneratorName][group.name] = {
            description,
            specs,
          };
          loggerService.info(
            "\x1b[32m" +
              `Successfully updated group ${group.name} with id ${group.id}`
          );
        }
      }
    }
  }

  return groupGeneratorsUpdated;
};
