
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x793d2996FA121F40Be379dc0204f8C91520B0884": "1",
      "0x04a02eb067D6CDC7e4f4C1b112456C94EC38Dd40": "1",
      "0x906260Ea20B9b6554aEEE3BA7F349980CD0d1F5d": "1",
      "0x9522F29A27CaF4b82C1f22d21eAD2E081A68A899": "1",
      "0xb6d854b2C3eaB99649D8df4EC6DAAC805A0D97AF": "1",
      "0x962aceb4c3c53f09110106d08364a8b40ea54568": "1",
      "0xbEC6936f5F6304394FDFeb4Ab56186400fB3351D": "1",
      "0x4BC5f847EAA543F9a57a47f2700653392483C6A1": "1",
      "0x577acD60F180802458a75188B74ED186087aA2b6": "1",
      "0xbBA94db3cE0F21Cf9977813c06Dc9C6490E7Dfdb": "1",
      "0x49Da809Dfc8C12F56470Af65E91f308f65635027": "1",
      "0xBdf7bD3a103F84B3D681363eab0737cFF3a3E894": "1",
      "0x7bBfecDCF7d0E7e5aA5fffA4593c26571824CB87": "1",
      "0x2B1a884Dc7a8f0cc17939928895D9D7cb9146074": "1",
    };
    
    const jsonListData1 = {
      "leo21.eth": "1",
      "henrli.eth": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "esilv-workshop-2023",
        timestamp: context.timestamp,
        description: "ZK Badge owned by attenders of the ESILV workshop 2023 fintech students",
        specs: "Having sent your addresses during the 2023 workshop at ESILV",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
