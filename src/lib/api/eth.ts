// import {
//     ethers
// } from "./ethers-5.0.esm.min.js"
import { BigNumber, ethers, Event } from "ethers"

// const RINKEBY_CONTRACT_ADDRESS = "0x01061ca4f1F13f69da0C3AAa45A03e1a40FCA473"
const RINKEBY_CONTRACT_ADDRESS = "0x07811b83f0E4769439086d4015C9Ed053cd91D3b"

const ABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "wallet",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Deposited",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "TargetReached",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "a",
                type: "address",
            },
        ],
        name: "Unwhitelisted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "a",
                type: "address",
            },
        ],
        name: "Whitelisted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "wallet",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Withdrew",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "id",
                type: "string",
            },
            {
                internalType: "address",
                name: "admin",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "targetPrice",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "isPrivate",
                type: "bool",
            },
        ],
        name: "createParty",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "getAdmin",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "getAssetBought",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "address",
                name: "contributor",
                type: "address",
            },
        ],
        name: "getContribution",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "getIsPrivate",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "getPercContributed",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "getTarget",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
        ],
        name: "getTotalContributions",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "address",
                name: "investor",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "resalePrice",
                type: "uint256",
            },
        ],
        name: "payout",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "address",
                name: "investor",
                type: "address",
            },
        ],
        name: "refund",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "bool",
                name: "isPrivate",
                type: "bool",
            },
        ],
        name: "setPrivate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "address",
                name: "a",
                type: "address",
            },
        ],
        name: "unwhitelisted",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "address",
                name: "a",
                type: "address",
            },
        ],
        name: "whitelist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "partyId",
                type: "string",
            },
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "address[14]",
                        name: "addrs",
                        type: "address[14]",
                    },
                    {
                        internalType: "uint256[18]",
                        name: "uints",
                        type: "uint256[18]",
                    },
                    {
                        internalType: "uint8[8]",
                        name: "feeMethodsSidesKindsHowToCalls",
                        type: "uint8[8]",
                    },
                    {
                        internalType: "bytes",
                        name: "calldataBuy",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "calldataSell",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "replacementPatternBuy",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "replacementPatternSell",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "staticExtradataBuy",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "staticExtradataSell",
                        type: "bytes",
                    },
                    {
                        internalType: "uint8[2]",
                        name: "vs",
                        type: "uint8[2]",
                    },
                    {
                        internalType: "bytes32[5]",
                        name: "rssMetadata",
                        type: "bytes32[5]",
                    },
                ],
                internalType: "struct BlockParties.wyvernAtomicMatchData",
                name: "_data",
                type: "tuple",
            },
        ],
        name: "wyvernAtomicMatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

const ALCHEMY_KEY = "XdSlj6cqpIj9e1W8viD-8dvUIpwy43CU"
// const ALCHEMY_WS_RINKEBY = "wss://eth-rinkeby.ws.alchemyapi.io/v2/XdSlj6cqpIj9e1W8viD-8dvUIpwy43CU"
// const ALCHEMY_RINKEBY = "https://eth-rinkeby.alchemyapi.io/v2/XdSlj6cqpIj9e1W8viD-8dvUIpwy43CU"
const provider = new ethers.providers.AlchemyProvider("rinkeby", ALCHEMY_KEY)

export class EthHelper {
    static intialized = false
    static contract

    /**
     * Create a new party on chain.
     */
    // static createParty = async () => {
    //     console.log("CREATING PARTY - ")

    //     // First call create party as a "read only" call to see which ID would be assigned
    //     const newId = await EthHelper.contract.callStatic.createParty(100)
    //     await EthHelper.contract.createParty(100)

    //     // Convert from BigNumber. Converting to a number is fine because
    //     // the contract specifies the ID as a uint64.
    //     return await newId.toNumber()
    // }

    static async fetchTarget(partyId: string): Promise<BigNumber> {
        await this.init()
        return await this.contract.getTarget(partyId)
    }

    static async fetchContributions(partyId: string): Promise<BigNumber> {
        await this.init()

        const amount = await this.contract.getTotalContributions(partyId)
        return await amount
    }

    static async fetchProgress(partyId: string): Promise<BigNumber> {
        await this.init()

        const amount = await this.contract.getPercContributed(partyId)
        console.log(amount)
        return await amount
    }

    static async invest(partyId, amount) {
        await this.init()

        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        console.log(await signer.getAddress())
        const contract = EthHelper.contract.connect(signer)

        // console.log(ethers.utils.formatEther(amount))

        const response = await contract.deposit(partyId, {
            value: ethers.utils.parseEther(amount),
        })
        console.log(response)
    }

    static async init() {
        if (!this.intialized) {
            // TODO: Handle no ethereum present

            // console.log(window.ethereum)
            // await window.ethereum.enable()
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // console.log(await signer.getAddress())
            this.contract = new ethers.Contract(RINKEBY_CONTRACT_ADDRESS, ABI, provider)
        }

        this.intialized = true
    }

    static async onInvestment(callback: (partyId, amount, event) => void) {
        console.log("ADD LISTENER")
        this.contract.on("Deposited", callback)
    }

    static newBigNumber(value: any) {
        return BigNumber.from(value)
    }

    static utils = ethers.utils
}
