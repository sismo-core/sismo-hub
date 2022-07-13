import PoapSubgraphProvider from './provider';

import { IPoapSubgraphProvider, QueryEventTokenOwnersInput, QueryEventTokensOwnersOutput } from './types';

import PoapCrossChainSubgraphProvider from './cross-chain/provider';

import { IPoapCrossChainSubgraphProvider } from './cross-chain/types';

export {
    PoapSubgraphProvider,
    IPoapSubgraphProvider,
    PoapCrossChainSubgraphProvider,
    IPoapCrossChainSubgraphProvider as IPoapMultiChainSubgraphProvider,
    QueryEventTokenOwnersInput as PoapQueryEventTokenOwnersInput,
    QueryEventTokensOwnersOutput as PoapQueryEventTokensOwnersOutput
};

