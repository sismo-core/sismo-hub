import { createDir, readJSONFile, writeFile } from "./files";
import fs from "fs";

const DISK_PATH = `${__dirname}/../../tmp`;

export const storeOnDisk = async (
  key: string,
  value: any,
  namespace: string
) => {
  const dir = `${DISK_PATH}/${namespace}`;
  await createDir(dir);
  await writeFile(`${dir}/${key}.json`, value);
  return { base: `${DISK_PATH}`, key: `${namespace}/${key}.json` };
};

export const loadFromDisk = async (key: string) => {
  const isFileGenerated = fs.existsSync(`${DISK_PATH}/${key}`);
  if (!isFileGenerated) return null;
  return await readJSONFile(`${DISK_PATH}/${key}`);
};
