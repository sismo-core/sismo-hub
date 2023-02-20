export const insert = (arr: string[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const insertIntoFile = ({
  content,
  regex,
  insertion,
}: {
  content: string;
  regex: RegExp;
  insertion: string;
}) => {
  let lines = content.split("\n");

  const isMatch = (chain: string) => regex.test(chain);

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
  let endPatternLineNumber = 0;
  const inserted = false;
  for (let i = 0; i < lines.length; i++) {
    const lineMatchedPattern = isMatch(lines[i]);
    if (beginPatternLineNumber === null && lineMatchedPattern) {
      beginPatternLineNumber = i;
    }
    if (lineMatchedPattern) {
      endPatternLineNumber = i;
    }
  }
  if (beginPatternLineNumber === null) {
    throw new Error(`Could not find a line matching ${regex}`);
  }
  if (!inserted) {
    lines = insert(lines, endPatternLineNumber + 1 + offset, insertion);
  }
  return lines.join("\n");
};
