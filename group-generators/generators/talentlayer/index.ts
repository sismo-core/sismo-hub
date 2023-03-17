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

  const didWork = await talentLayerProvider.didWorkOnTopic({
    topic: topic,
    numberOfTimes: numberOfTimes,
  });

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

const generateRatingGroup = async (
  context: GenerationContext,
  minRating: number,
  numberOfTimes: number
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const didWorkWithRating = await talentLayerProvider.didWorkWithRating({
    minRating,
    numberOfTimes,
  });

  return {
    name: `talentlayer-rating${minRating}-${numberOfTimes}`,
    timestamp: context.timestamp,
    description: `Complete work with minimum ${minRating} as rating`,
    specs: `Collect all users that completed work at least ${numberOfTimes} times with a ${minRating} rating on TalentLayer protocol`,
    data: didWorkWithRating,
    valueType: ValueType.Score,
    tags: [Tags.User],
  };
};

const generateDidSellerServiceForBuyerGroup = async (
  context: GenerationContext,
  buyer: string,
  minimalServices: number
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const didWork = await talentLayerProvider.didSellerServiceBuyer({
    buyerHandle: buyer,
    minimalAmountOfServices: minimalServices,
  });

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

const generateDidUserMinimalEarnedOfTokenGroup = async (
  context: GenerationContext,
  minimalEarned: number,
  tokenSymbol: string
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const didEarnMore = await talentLayerProvider.didUserMinimalEarnedOfToken({
    minimumEarnings: minimalEarned,
    tokenSymbol: tokenSymbol,
  });

  return {
    name: "talentlayer-earned-more-than",
    timestamp: context.timestamp,
    description:
      "Find out if a user earned more than a certain amount of a token in total",
    specs:
      "Check to see if a user earned more than a certain amount of a token in total",
    data: didEarnMore,
    valueType: ValueType.Score,
    tags: [Tags.User],
  };
};

const generateTalentOfTheMonthGroup = async (
  context: GenerationContext,
  topic: string,
  period: string,
  tokenSymbol: string,
  leaderboardSize: number
): Promise<GroupWithData> => {
  const talentLayerProvider = new dataProviders.TalentLayerProvider();

  const leaderboard = await talentLayerProvider.getTalentOfTheMonth(
    topic,
    period,
    tokenSymbol,
    leaderboardSize
  );

  return {
    name: "talentlayer-talent-of-the-month",
    timestamp: context.timestamp,
    description:
      "Generate a leaderboard of the most talented users of the month for a specific topic",
    specs:
      "Generate a leaderboard of the most talented users of the month for a specific topic of a certain size",
    data: leaderboard,
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
      "alice",
      1
    );
    const didUserMinimalEarnedGroup =
      await generateDidUserMinimalEarnedOfTokenGroup(context, 0.001, "MATIC");
    const solidityGroup1 = await generateTopicGroup(context, "solidity", 1);
    const ratingGroup5 = await generateRatingGroup(context, 5, 1);

    const talentOfTheMonth = await generateTalentOfTheMonthGroup(
      context,
      "solidity",
      "2023-03",
      "MATIC",
      1
    );

    return [
      contributorsGroup,
      usersGroup,
      didServiceGroup,
      didUserMinimalEarnedGroup,
      solidityGroup1,
      ratingGroup5,
      talentOfTheMonth,
    ];
  },
};

export default generator;
