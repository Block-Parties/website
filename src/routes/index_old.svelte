<script context="module">
    // export const prerender = true
</script>

<script lang="ts">
    import ScrollButton from "$lib/components/splash/ScrollButton.svelte"

    function browse() {
        // location.href = "/parties"
        alert("Coming Soon!")
    }

    function installExtension() {
        // location.href = "https://google.com"
        alert("Coming Soon!")
    }

    let email: string

    async function signUp() {
        await fetch("http://3.143.138.224:8000/join-beta", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                createdAt: new Date(),
            }),
        })

        alert("Thank you for registering!")
    }

    function scroll() {
        const elem = document.getElementsByClassName("two")[0]

        scrollTo({
            top: elem.getBoundingClientRect().top,
            behavior: "smooth",
        })
    }
</script>

<div class="section one full-height">
    <div class="content">
        <img src="images/full_logo.svg" class="logo" alt="Block Parties" />

        <!-- <p>Block Parties</p> -->

        <!-- <p>
            Block Parties lets you buy and sell fractional NFTs. We leverage Ethereum smart contracts to enable
            trustless group investing.
        </p> -->

        <div class="button-row">
            <button on:click={browse}>Browse</button>
            <button on:click={installExtension}>Install the Extension</button>
        </div>

        <div class="email-form">
            <h5>Reserve your seat in the limited access beta</h5>
            <br /><br />
            <div class="form-input">
                <input bind:value={email} type="email" placeholder="Enter your email" />
                <button on:click={signUp}>Submit</button>
            </div>
            <p>We won't use your email for anything other than letting you know when beta opens.</p>
            <br />
            <p>Wanna chat? <a href="https://discord.gg/TNGQuuazez"> Join our Discord</a></p>
        </div>

        <div class="scroll-button" on:click={scroll}>
            <ScrollButton />
        </div>

        <!-- 
        <div class="card">
            <div style="height: 65vh;">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/4LwXiQ1Zxig"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            </div>
        </div> -->
    </div>
</div>

<div class="section two">
    <div class="content">
        <div class="row">
            <div class="card">
                <ol>
                    <li>Find an NFT you want to flip.</li>
                    <li>Choose a party, or create a new one.</li>
                    <li>Invest!</li>
                    <li>Share the party with friends and others, and watch investments roll in.</li>
                    <li>Block Parties buys the NFT on your behalf, and lists it for sale.</li>
                    <li>Your NFT gets sold - profit!</li>
                </ol>
            </div>

            <div class="divider" />

            <div class="card">
                <ol>
                    <li>Find an NFT you want to flip.</li>
                    <li>Choose a party, or create a new one.</li>
                    <li>Invest!</li>
                    <li>Share the party with friends and others, and watch investments roll in.</li>
                    <li>Block Parties buys the NFT on your behalf, and lists it for sale.</li>
                    <li>Your NFT gets sold - profit!</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="section three">
    <div class="content">
        <h1>Frequently Asked Questions</h1>

        <p class="question">What do I need to get started investing?</p>
        <p class="answer">
            To invest, all you need is a web compatible Ethereum wallet. We recommend the popular wallet + extension
            MetaMask. (include link). To create new parties, you'll need to install our Chrome Extension.
        </p>
        <hr />

        <p class="question">Can I withdraw money invested in a party?</p>
        <p class="answer">
            Yes, you can withdraw your investment in any party at any time, up to the point the NFT is purchased.
        </p>
        <hr />

        <p class="question">Where is my invested money stored?</p>
        <p class="answer">
            While a party is still collectings funds, your investment is stored securely on a proprietary smart contract
            in the Ethereum blockchain. At no point do your funds enter a wallet that’s not yours or, after a successful
            purchase, the person(s) selling the NFT, fees excluded.
        </p>
        <hr />

        <p class="question">My party’s NFT doesn’t seem to be selling. What can I do?</p>
        <p class="answer">
            The NFT market is still young and somewhat exotic. Many NFTs will naturally take some time to sell, but if
            you're still concerned after some time, reach out to us directly, and we'll do our best to help you sell.
        </p>
        <hr />

        <p class="question">I have some feedback, concerns, or additional questions.</p>
        <p class="answer">
            If you'd like to get in touch with us, we've setup a public Discord server where our team is available to
            talk to.
        </p>
    </div>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
    }

    :global(nav) {
        display: none;
    }

    .content {
        max-width: 1200px;
        margin: auto;
        padding: 0 32px;
    }

    ol {
        margin: 0;
    }

    button {
        cursor: pointer;
        background: #0352af;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        border: none;
        padding: 12px;

        font-weight: 600;
        font-size: 16px;
    }

    .logo {
        filter: brightness(0) saturate(100%) invert(0%) sepia(7%) saturate(349%) hue-rotate(75deg) brightness(100%)
            contrast(100%) invert(100%);
    }

    .divider {
        width: 4px;
        height: 100%;
        background: white;
    }

    .button-row {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;

        margin: 16px;

        button {
            margin: 8px;
            // margin-bottom: 16px;
            // margin-right: 16px;
        }
    }

    .card {
        background: #0e0606;
        box-shadow: 0px 4px 4px 4px rgba(32, 32, 32, 0.25);
        border-radius: 24px;

        overflow: hidden;
    }

    .full-height {
        height: 100vh;
    }

    .section {
        width: 100%;

        background: linear-gradient(180deg, #5c329f 0%, #13053e 100%);
    }

    .one {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            width: 240px;
        }
    }

    .two {
        display: flex;
        flex-direction: row;
        height: 50vh;

        // background: linear-gradient(180deg, #13053e 0%, #0070d7 100%);
        background: rgb(211, 211, 211);
    }

    .three {
        background: #161616;
        padding: 64px 0;

        .question {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 4px;
        }

        .answer {
            margin: 8px 0;
        }

        h1 {
            padding: 0 0 48px 0;
        }

        hr {
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.75); //; border-width: 0.25px;

            margin: 32px 0;
            // border-color: rgba(255, 255, 255, 0.5);s
        }
    }

    .email-form {
        width: 480px;
        margin: 32px auto;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 24px;

        background: linear-gradient(0deg, #040a11, #040a11), #0352af;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;

        .form-input {
            width: 100%;
            display: flex;

            input {
                flex: 1;
                height: 48px;

                border: none;
                background: rgba(142, 145, 148, 0.1);
                border-radius: 4px;
                color: white;

                margin-right: 16px;
                padding: 0 16px;
            }

            button {
                height: 48px;
                width: 80px;
                border: none;
                background: #400a84;
                border-radius: 4px;
                padding: 8px;

                color: white;
                font-weight: 600;
                font-size: 14px;
            }
        }

        h5 {
            margin: 0;
        }

        p {
            font-size: 12px;
            font-weight: 300;
            text-align: start;
            margin-top: 8px;
            color: #aaa;
        }
    }

    .scroll-button {
        position: absolute;
        bottom: 32px;
        left: calc(50% - 32px);
    }
</style>
