import * as fs from "fs";

export const createDir = async (path: string): Promise<string> => {
  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }
  return path;
};

export const writeFile = async (fileLocation: string, data: any) => {
  await fs.promises.writeFile(
    fileLocation,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
};

export const readJSONFile = async (fileLocation: string): Promise<any> => {
  const content = (await fs.promises.readFile(fileLocation, "utf8")).toString();
  return JSON.parse(content);
};
