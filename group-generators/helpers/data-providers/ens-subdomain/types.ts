export type EnsSubdomainsResponse = {
  domains: [
    {
      name: string;
      subdomains: [
        {
          owner: {
            id: string;
          };
        }
      ];
    }
  ];
};

export type EnsDomainParams = { subdomainId: string };

// query Domains {
//     domains(where: {labelName: "sismo"}) {
//         name
//         subdomains(first: 1000) {
//             owner {
//                 id
//             }
//         }
//     }
// }

// {
//     "data": {
//         "domains": [
//             {
//                 "name": "sismo.eth",
//                 "subdomains": [
//                     {
//                         "owner": {
//                             "id": "0xef218cb373743770f7096baad714b6a979bee2ed"
//                         }
//                     },
//                     {
//                         "owner": {
//                             "id": "0xc4798b79d22630cee83b4ecb0fd98cd5ff0fbb62"
//                         }
//                     },
//                     {
//                         "owner": {
//                             "id": "0xf4b0400eb76fb71e111322360cea2efdc6be0bfb"
//                         }
//                     },


// query Domains {
//     domains(
//         where: {id: "0x433c99d8edd0cf295e2314840cf7f62ca9b23c2d6004e72c706022297ae716ab"}
//     ) {
//         name
//         subdomains(first: 1000, skip: null) {
//             owner {
//                 id
//             }
//         }
//     }
// }
