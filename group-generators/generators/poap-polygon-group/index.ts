
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

        const jsonListData0 = {
            "0xD12b78Df063fC4bC7bb12CF1f060B55a15dD759d": "1",
            "0x6647a7858a0B3846AbD5511e7b797Fc0a0c63a4b": "1",
            "0xE13F6360eCD6dF96290d5581fAC6ab57B9c5fa56": "1",
            "0x2741acb77d4e4d7fDDd9144233f0a08F60171ad1": "1",
            "0xd0707F17a40Cb505bA3B85146990738424aac7FA": "1",
            "0x7c16eCE9f1a4De5a3AFa455492e3AFd9c98F36bE": "1",
            "darrylyeo.eth": "1",
            "0xe7910F0b83ad155737043c771E2594f74B0BB739": "1"
        };

        return [
            {
                // give a name to your Group
                name: "poap-polygon-group",
                timestamp: context.timestamp,
                // add a small description explaining how to be eligible to your Group
                description: "Be at the RIVER event at ETHDenver 2023",
                // document the Group eligibility criterias more specifically
                specs: "Give out badges as POAPs on Polygon",
                // reference the final data we created
                // two different data formats in the Group
                // Lens account -> "dhadrien.lens": "1"
                // Ethereum account -> "0x95af97aBadA3b4ba443ff345437A5491eF332bC5": "1", 
                data: jsonListData0,
                valueType: ValueType.Info,
                tags: [Tags.User, Tags.Lens, Tags.Web3Social],
            },
        ];
    },
};

export default generator;