import { ethers } from "ethers";

export class JsonRpcProvider extends ethers.providers.JsonRpcProvider {
    constructor(jsonRpcUrl?: string) {
        super(
            jsonRpcUrl
        )
    }
}

