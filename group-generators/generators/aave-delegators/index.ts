import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query";
import { ValueType, GroupWithData, FetchedData, Tags } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bigQueryProvider = new BigQueryProvider();

    type Delegation = {
      blockNumber: number;
      delegatee: string;
      delegationType: number;
    }

    type DelegationsEntry = {
      [address: string]: Delegation[];
    }


    const aaveTokenContract = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
    const stkAaveTokenContract = "0x4da27a545c0c5B758a6BA100e3a049001de870f5";

    const blockNumberSnapshot = 17563020;

    const getDelegators = async (events: any): Promise<FetchedData> => {
      const delegations : DelegationsEntry = {};
      const delegators: FetchedData = {};

      // group the events by delegator
      for (const event of events) {
        delegations[event.delegator] = delegations[event.delegator]
            ? [...delegations[event.delegator], {"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}]
            : [{"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}];
      }

      for(const [address, info] of Object.entries(delegations)) {

        const lastDelegations: any = {};

        // get the last delegation for each type of delegation
        info.forEach(info => {
          const type = info.delegationType;
          if (!lastDelegations[type] || info.blockNumber > lastDelegations[type].blockNumber) {
            lastDelegations[type] = info;
          }
        });

        // if the address has delegated its voting power to someone we add it to the delegators object
        delegators[address]=1;
      }
      return delegators;
    };

    // #######################
    // # GET AAVE DELEGATORS #
    // #######################

    const delegateEventABI = "event DelegateChanged(address indexed delegator, address indexed delegatee, uint8 delegationType)"
    type delegateEventArgs = {
      delegator: string;
      delegatee: string;
      delegationType: any;
    };

    let aaveDelegateEvents: any =
        await bigQueryProvider.getEvents<delegateEventArgs>(
            {
              eventABI: delegateEventABI,
              contractAddress: aaveTokenContract,
            }
        );

    aaveDelegateEvents = aaveDelegateEvents.filter((event: any) => event.block_number < blockNumberSnapshot);


    const aaveDelegators = await getDelegators(aaveDelegateEvents);

    // ##########################
    // # GET STKAAVE DELEGATORS #
    // ##########################

    let stkAaveDelegateEvents: any =
        await bigQueryProvider.getEvents<delegateEventArgs>(
            {
              eventABI: delegateEventABI,
              contractAddress: stkAaveTokenContract,
            }
        );

    stkAaveDelegateEvents = stkAaveDelegateEvents.filter((event: any) => event.block_number < blockNumberSnapshot);

    const stkaaveDelegators = await getDelegators(stkAaveDelegateEvents);

    // ####################
    // # UNION THE GROUPS #
    // ####################

    const delegators = dataOperators.Union([aaveDelegators, stkaaveDelegators], UnionOption.Sum);

    return [
      {
        name: "aave-delegators",
        timestamp: context.timestamp,
        description:
            "Data Group of all Aave delegators",
        specs:
            "Contains all Aave delegators. Tokens taken into account: • Aave • stkAave.",
        data: delegators,
        valueType: ValueType.Score,
        tags: [Tags.Maintained],
      },
    ];
  },
};

export default generator;
