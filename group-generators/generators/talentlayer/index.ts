import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generateContributorsGroup = async (
  context: GenerationContext
): Promise<GroupWithData> => {
  const githubProvider = new dataProviders.GithubProvider();

  const githubProviderData0 = await githubProvider.getRepositoriesContributors({
    repositories: [
      "TalentLayer/talentlayer-id-contracts",
      "TalentLayer-Labs/indie-frontend",
      "TalentLayer/talentlayer-id-subgraph",
    ],
  });

  return {
    name: "talentlayer-contributors",
    timestamp: context.timestamp,
    description: "TalentLayer OpenSource Contributors",
    specs: "Help us building TalentLayer protocol ",
    data: githubProviderData0,
    valueType: ValueType.Score,
    tags: [Tags.Factory],
  };
};

const generateUsersGroup = async (
  context: GenerationContext
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const talentLayerProviderData0 =
    await talentLayerProvider.getUsersWithTalentLayerId();

  return {
    name: "talentlayer-users",
    timestamp: context.timestamp,
    description: "Be a user of talentLayer",
    specs: "Collect all users from decentralized subgraph of the protocol",
    data: talentLayerProviderData0,
    valueType: ValueType.Score,
    tags: [Tags.User],
  };
};

const generateTopicGroup = async (
  context: GenerationContext,
  topic: string,
  numberOfTimes: number
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const didWork = await talentLayerProvider.didWorkOnTopic(
    topic,
    numberOfTimes
  );

  return {
    name: `talentlayer-${topic}-${numberOfTimes}`,
    timestamp: context.timestamp,
    description: `Be skilled in ${topic}`,
    specs: `Collect all users that already work at least ${numberOfTimes} times on a ${topic} project on TalentLayer protocol`,
    data: didWork,
    valueType: ValueType.Score,
    tags: [Tags.User],
  };
};

const generateDidSellerServiceForBuyerGroup = async (
  context: GenerationContext,
  buyer: string
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const didWork = await talentLayerProvider.didSellerServiceBuyerQuery(
    buyer,
    1
  );

  return {
    name: "talentlayer-did-work-for",
    timestamp: context.timestamp,
    description: "Find out if a user did work for a company",
    specs:
      "Check to see if a user did work for a company by checking the subgraph",
    data: didWork,
    valueType: ValueType.Score,
    tags: [Tags.User],
  };
};

const generateGetUserTotalSalaryGroup = async (
  context: GenerationContext,
  userAddress: string
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const didWork = await talentLayerProvider.getUserTotalSalary(userAddress);

  return {
    name: "talentlayer-did-work-for",
    timestamp: context.timestamp,
    description: "Find out if a user did work for a company",
    specs:
      "Check to see if a user did work for a company by checking the subgraph",
    data: didWork,
    valueType: ValueType.Score,
    tags: [Tags.User],
  };
};

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const contributorsGroup = await generateContributorsGroup(context);
    const usersGroup = await generateUsersGroup(context);
    const didServiceGroup = await generateDidSellerServiceForBuyerGroup(
      context,
      "alice"
    );
    3;
    const getUserTotalSalaryGroup = await generateGetUserTotalSalaryGroup(
      context,
      "miguel"
    );
    const solidityGroup1 = await generateTopicGroup(context, "solidity", 1);

    return [
      contributorsGroup,
      usersGroup,
      didServiceGroup,
      getUserTotalSalaryGroup,
      solidityGroup1,
    ];
  },
};

export default generator;
