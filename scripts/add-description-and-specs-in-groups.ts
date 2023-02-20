import fs from "fs";
import path from "path";
import axios from "axios";
import { insertIntoFile } from "helpers/insert";
import { BadgeMetadata } from "topics/badge";

type DescriptionAndSpecs = {
  name: string;
  groupGeneratorName: string;
  description: string;
  specs: string;
};

const URLS: { [name: string]: string } = {
  staging: "https://hub.staging.zikies.io",
  testnets: "https://hub.testnets.sismo.io",
  prod: "https://hub.sismo.io",
};

const insertDataIntoFile = (fileName: string, description: string, specs: string) => {
  const fileData = fs.readFileSync(path.join(__dirname, fileName), "utf8");
  const lines = insertIntoFile({
    content: fileData,
    regex: /\s*timestamp: context\.timestamp,/,
    insertion: `        description: "${description}",
        specs: "${specs}",`,
  });

  console.log("fileData", lines);
  return lines;
};

const fetchBadges = async (url: string): Promise<DescriptionAndSpecs[]> => {
  console.log(`Fetching badges from ${url}`);

  const response = await axios({
    url: `${url}/badges/`,
    method: "get",
  });

  const badges: BadgeMetadata[] = response.data.items.slice(0, 3);

  const descriptionAndSpecs = badges.map((badge) => {
    const { eligibility } = badge;
    const description = eligibility.shortDescription ?? "";
    const specs = eligibility.specification ?? "";

    return {
      name: badge.name,
      groupGeneratorName: badge.groupGeneratorName,
      description,
      specs,
    };
  });

  return descriptionAndSpecs;
};

const main = async () => {
  const badgesByEnv: { [name: string]: DescriptionAndSpecs[] } = {};

  await Promise.all(
    Object.keys(URLS).map(async (key: string) => {
      badgesByEnv[key] = await fetchBadges(URLS[key]);
    })
  );

  // open files and write to them based on group generator name
  const updatedFiles: { [name: string]: string } = {};
  for (const env of Object.keys(badgesByEnv)) {
    const badges = badgesByEnv[env];
    for (const badge of badges) {
      const { groupGeneratorName, description, specs } = badge;
      const fileName = `../group-generators/generators/${groupGeneratorName}/index.ts`;
      if (!updatedFiles[fileName]) {
        const file = insertDataIntoFile(fileName, description, specs);
        updatedFiles[fileName] = file;
      }
    }
  }
};

main();
