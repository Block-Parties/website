// import {
//     ethers
// } from "./ethers-5.0.esm.min.js"
import { BigNumber, ethers, Event } from "ethers"

const RINKEBY_CONTRACT_ADDRESS = "0x28870c0f106793b69a2a4f58203df4a8538ba6cc"

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
                internalType: "uint64",
                name: "partyId",
                type: "uint64",
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
                internalType: "uint64",
                name: "partyId",
                type: "uint64",
            },
        ],
        name: "ObtainedNft",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "partyId",
                type: "uint64",
            },
        ],
        name: "TargetReached",
        type: "event",
    },
    {
        inputs: [],
        name: "id",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "view",
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
                internalType: "uint256",
                name: "targetPrice",
                type: "uint256",
            },
        ],
        name: "createParty",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "partyId",
                type: "uint64",
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
                internalType: "uint64",
                name: "partyId",
                type: "uint64",
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
                internalType: "uint64",
                name: "partyId",
                type: "uint64",
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

    static async fetchPartyContributions(partyId): Promise<BigNumber> {
        await this.init()

        const amount = await this.contract.getTotalContributions(partyId)
        return await amount
    }

    static async invest(partyId, amount) {
        // await this.init()

        // TODO

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
