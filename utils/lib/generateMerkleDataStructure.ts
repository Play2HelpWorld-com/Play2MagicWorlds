import { MerkleTree } from "merkletreejs";
import { keccak256, ethers } from "ethers";
import { TokenReward } from "@/types/tokenReward";
import { MerkleResult } from "@/types/merkleResult";



/// @dev this function receives an array of objects
/// @dev the array of token reward should come from the database
/// @dev GenerateMerkleDatastructure returns serialized leaves and the merkelRoot

/// @dev there should be a table to save the serialized leaves and the date it was modified. Table should have
/// @dev two fields of serializedLeaves and date modified. when the data is saved we update the date modified

const GenerateMerkleDatastructure = (tokenRewards: TokenReward[] = []): MerkleResult => {
    let merkleTree: MerkleTree, merkleRoot: string;
    const leaves = tokenRewards.map((claim: TokenReward) =>
      keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ["address", "address", "uint256"],
          [claim.wallet_address, claim.token_address, ethers.parseUnits(claim.amount.toString(), 5)] 
        )
      )
    );
    merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    merkleRoot = merkleTree.getHexRoot();
  
    // Serialize data - convert to hex strings without Buffer conversion
    const serializedLeaves = JSON.stringify(leaves);
    return { serializedLeaves, merkleRoot };
  }


const RegenerateMerkleTree = (serializedLeaves: string) => {
    const parsedLeaves = JSON.parse(serializedLeaves);
    // Recreate the Merkle Tree directly from the hex strings
    const reconstructedTree = new MerkleTree(parsedLeaves, keccak256, { sortPairs: true });
    const reconstructedRoot = reconstructedTree.getHexRoot();
    return {
      merkleTree: reconstructedTree,
      merkleRoot: reconstructedRoot
    }
  }

export { GenerateMerkleDatastructure, RegenerateMerkleTree };