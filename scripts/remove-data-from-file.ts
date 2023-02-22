import fs from "fs";
import path from "path";

const FILENAMES = [
  "local/hydra-s1-accountbound.ts",
  "main/hydra-s1-accountbound.ts",
  "main/factory/hydra-s1-accountbound-factory-badges.ts",
  "playground/hydra-s1-accountbound.ts",
  "playground/factory/hydra-s1-accountbound-factory-badges.ts",
];

export const removeFromFile = ({ content, regex }: { content: string; regex: RegExp }) => {
  let lines = content.split("\n");
  const length = lines.length;

  const isMatch = (chain: string) => regex.test(chain);

  let beginPatternLineNumber = null;
  for (let i = 0; i < length; i++) {
    const lineMatchedPattern = isMatch(lines[i]);
    if (beginPatternLineNumber === null && lineMatchedPattern) {
      beginPatternLineNumber = i;
      // while (!/,$/.test(lines[i])) {
      //   i += 1;
      // }
      lines = [
        ...lines.splice(0, beginPatternLineNumber),
        ...lines.splice(i - beginPatternLineNumber + 1),
      ];
      beginPatternLineNumber = null;
    }
  }
  return lines.join("\n");
};

const main = async () => {
  for (const files of FILENAMES) {
    const filePath = path.join(__dirname, "..", "badges-metadata", files);
    const dataFile = fs.readFileSync(filePath, "utf8");
    const data = removeFromFile({
      content: dataFile,
      regex: /\s*groupGeneratorName:/,
    });
    fs.writeFileSync(filePath, data);
  }
};

main();
