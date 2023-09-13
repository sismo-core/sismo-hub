import axios from "axios";
import { Tags, ValueType, GroupWithData, FetchedData, AccountSource } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    type Passport = {
      passport: { address: string };
      evidence: { rawScore: string };
    };

    const evmAddressRegEx = new RegExp("^0x[a-fA-F0-9]{40}$");

    const gitcoinPassportHolders: FetchedData = {};
    const url = "https://public.scorer.gitcoin.co/passport_scores/registry_score.jsonl";

    // Create a promise to wrap the streaming logic
    const streamData = new Promise<void>((resolve, reject) => {
      axios
        .get(url, {
          responseType: "stream",
        })
        .then((response) => {
          // Buffer to store the streamed data
          let textBuffer = "";

          // Listen to the 'data' event on the response stream
          response.data.on("data", (chunk: Buffer) => {
            // save the data chunk to the buffer
            textBuffer += chunk.toString();

            let newlineIndex;
            while ((newlineIndex = textBuffer.indexOf("\n")) >= 0) {
              // extract the line from the buffer
              const line = textBuffer.slice(0, newlineIndex).trim();
              // remove the line from the buffer
              textBuffer = textBuffer.slice(newlineIndex + 1);

              if (line) {
                const { passport, evidence } = JSON.parse(line) as Passport;
                if (evmAddressRegEx.test(passport.address)) {
                  if (!evidence?.rawScore) {
                    continue;
                  }
                  gitcoinPassportHolders[passport.address] = Math.floor(
                    Number(evidence.rawScore)
                  ).toString();
                }
              }
            }
          });

          response.data.on("end", () => {
            resolve();
          });

          response.data.on("error", (err: any) => {
            console.log("Error during streaming.");
            reject(err);
          });
        })
        .catch((err) => {
          console.log("Failed to fetch data while streaming.");
          reject(err);
        });
    });

    await streamData;

    return [
      {
        name: "gitcoin-passport-holders",
        timestamp: context.timestamp,
        description: "Data Group of all addresses that own a Gitcoin Passport",
        specs:
          "Contains all addresses that own a Gitcoin Passport. The value of each group member corresponds to their Gitcoin Passport score.",
        data: gitcoinPassportHolders,
        valueType: ValueType.Score,
        accountSources: [AccountSource.ETHEREUM],
        tags: [Tags.SybilResistance, Tags.Maintained],
      },
    ];
  },
};

export default generator;
