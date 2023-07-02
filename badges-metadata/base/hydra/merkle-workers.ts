import { parentPort } from 'worker_threads';
import { buildPoseidon } from '@sismo-core/crypto';
import { KVMerkleTree } from '@sismo-core/kv-merkle-tree';
import { MerkleTreeData } from '@badges-metadata/base/hydra/helpers';

interface WorkerInput {
  data: MerkleTreeData;
}

parentPort?.on('message', async (input: WorkerInput) => {
  const poseidon = await buildPoseidon();
  const tree = new KVMerkleTree(
    input.data,
    poseidon,
    20
  );
  const jsonTree = tree.toJson();
  const compressTreeV1 = tree.toCompressedTreeV1();
  parentPort?.postMessage({
    jsonTree,
    compressTreeV1,
  });
});