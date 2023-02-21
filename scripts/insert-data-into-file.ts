import fs from "fs";
import path from "path";

const FILENAMES = [
  // "local/hydra-s1-accountbound.ts",
  // "main/hydra-s1-accountbound.ts",
  "main/factory/hydra-s1-accountbound-factory-badges.ts",
  //"playground/hydra-s1-accountbound.ts",
  "playground/factory/hydra-s1-accountbound-factory-badges.ts",
];

export const insert = (arr: string[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const insertIntoFile = ({ content, regex }: { content: string; regex: RegExp }) => {
  const buildInsertion = (groupName: string) => {
    return `    groupSnapshot: {
      groupName: "${groupName}",
    },`;
  };
  let lines = content.split("\n");

  const isMatch = (chain: string) => regex.test(chain);

  let insertion = buildInsertion("a");
  // handle multi-line insertion
  const insertionLines = insertion.split("\n");
  let offset = 0;
  for (let i = 0; i < insertionLines.length; i++) {
    const line = insertionLines[i];
    const lineMatches = isMatch(line);
    if (lineMatches) {
      offset = -i;
      break;
    }
  }

  let beginPatternLineNumber = null;
  for (let i = 0; i < lines.length; i++) {
    const lineMatchedPattern = isMatch(lines[i]);
    if (beginPatternLineNumber === null && lineMatchedPattern) {
      beginPatternLineNumber = i;
      const groupName = (lines[i].match(/"([^']+)"/) as RegExpMatchArray)[1];
      insertion = buildInsertion(groupName);
      lines = insert(lines, i + 1 + offset, insertion);
      beginPatternLineNumber = null;
    }
  }

  return lines.join("\n");
};

const insertDataIntoFile = (fileName: string) => {
  const fileData = fs.readFileSync(path.join(__dirname, fileName), "utf8");
  const lines = insertIntoFile({
    content: fileData,
    regex: /\s*groupGeneratorName:/,
  });

  fs.writeFileSync(path.join(__dirname, fileName), lines);
  return lines;
};

const main = async () => {
  for (const filename of FILENAMES) {
    const fileName = `../badges-metadata/${filename}`;
    insertDataIntoFile(fileName);
  }
};

main();
