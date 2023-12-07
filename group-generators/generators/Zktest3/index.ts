import {
          ValueType,
          Tags,
          GroupWithData,
        } from "topics/group";
        import {
          GenerationContext,
          GenerationFrequency,
          GroupGenerator,
        } from "topics/group-generator";
        
        const generator: GroupGenerator = {
          generationFrequency: GenerationFrequency.Once,
        
          generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        
            const jsonListData0 = {"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045":"1","0xF61CabBa1e6FC166A66bcA0fcaa83762EdB6D4Bd":"1","0x2E21f5d32841cf8C7da805185A041400bF15f21A":"1"}
        
            return [
              {
                // give a name to your Group
                name: "Zktest3",
                timestamp: context.timestamp,
                description: "Group Description",
                // document the Group eligibility criterias more specifically
                specs: "Group Specifications", 
                data: jsonListData0,
                valueType: ValueType.Info,
                tags: [Tags.User, Tags.Lens, Tags.Web3Social],
              },
            ];
          },
        };
        
        export default generator;
        