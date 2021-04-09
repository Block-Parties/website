// import {
//     ethers
// } from "./ethers-5.0.esm.min.js"
import {
    ethers
} from "ethers"

const RINKEBY_CONTRACT_ADDRESS = "0xAc833FCcE0140760BbAA54214a47AcCfe42318c8"

const ABI = [{
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [{
            indexed: false,
            internalType: "uint64",
            name: "partyId",
            type: "uint64",
        }, ],
        name: "ObtainedNft",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{
            indexed: false,
            internalType: "uint64",
            name: "partyId",
            type: "uint64",
        }, ],
        name: "TargetReached",
        type: "event",
    },
    {
        inputs: [],
        name: "id",
        outputs: [{
            internalType: "uint64",
            name: "",
            type: "uint64",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint256",
            name: "targetPrice",
            type: "uint256",
        }, ],
        name: "createParty",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint64",
            name: "partyId",
            type: "uint64",
        }, ],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{
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
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
            internalType: "uint64",
            name: "partyId",
            type: "uint64",
        }, ],
        name: "getTotalContributions",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
]

// const ALCHEMY_RINKEBY = "https://eth-rinkeby.alchemyapi.io/v2/XdSlj6cqpIj9e1W8viD-8dvUIpwy43CU"
// const provider = ethers.getDefaultProvider("rinkeby", {
//     alchemy: ALCHEMY_RINKEBY,
// })

const RINKEBY_MNEMONIC = "travel glory faculty squeeze token census swing exhibit sample whale use safe"

// let ANDRES_WALLET = ethers.Wallet.fromMnemonic(RINKEBY_MNEMONIC)
// ANDRES_WALLET = ANDRES_WALLET.connect(provider)



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

    static async fetchPartyContributions(partyId) {
        await this.init()

        const amount = await this.contract.getTotalContributions(partyId)
        return await amount.toNumber()
    }

    static async invest(partyId, amount) {
        // await this.init()


        // TODO

        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        console.log(await signer.getAddress())
        const contract = EthHelper.contract.connect(signer)

        const response = await contract.deposit(partyId, {
            value: ethers.utils.parseEther(amount)
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
            this.contract = new ethers.Contract(RINKEBY_CONTRACT_ADDRESS, ABI, ethers.getDefaultProvider('rinkeby'))
        }

        this.intialized = true
    }
}