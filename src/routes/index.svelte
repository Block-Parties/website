<script lang="ts">
    import Waves from "$lib/components/splash/Waves.svelte"
    import { onMount } from "svelte"

    function showExtension() {
        open("https://google.com", "blank")
    }

    function showParties() {
        location.href = "/parties"
    }

    function scrollDown() {
        const elem = window.document.getElementsByClassName("how-it-works")[0]
        scrollTo({ top: elem.getClientRects().item(0).top, behavior: "smooth" })
    }
</script>

<div class="container">
    <div class="content">
        <div class="nav">
            <h4>Block Parties</h4>

            <div>
                <a on:click={scrollDown}>How it works</a>
            </div>
        </div>

        <div class="main" style="display:flex">
            <div>
                <p>The future of group transactions</p>
                <h1>
                    Invest securely
                    <br />
                    on the blockchain
                </h1>

                <h5>Buy and sell fractional NFTs with <b>blockparties</b></h5>

                <div class="button-row">
                    <button on:click={showParties}>Browse</button>
                    <button on:click={showExtension}>Install Extension</button>
                </div>
            </div>

            <div>
                <img src="images/people_circle.svg" alt="" />
            </div>
        </div>
    </div>

    <div class="waves">
        <Waves />
    </div>
</div>

<div class="how-it-works">
    <div class="content">
        <div class="cards">
            <div class="step-card">
                <div>
                    <h4>Step 1</h4>
                    <p>Browse the OpenSea marketplace.</p>
                </div>
            </div>
            <div class="step-card">
                <div>
                    <h4>Step 2</h4>
                    <p>Join a create a new party and invest!</p>
                </div>
            </div>
            <div class="step-card">
                <div>
                    <h4>Step 3</h4>
                    <p>Once the party is full, the NFT is purchased and listed for resale.</p>
                </div>
            </div>
            <div class="step-card">
                <div>
                    <h4>Step 4</h4>
                    <p>When the NFT gets sold, we distribute the profits to the party.</p>
                </div>
            </div>
        </div>

        <div class="video">.</div>
    </div>
</div>

<div class="sign-up">
    <div class="custom-button">
        <h1>Join 569 more people in the waitlist</h1>

        <div class="form">
            <input placeholder="Your email address" />
            <button>Join the waitlist</button>
        </div>
    </div>
</div>

<svelte:head>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<style lang="scss">
    :global(body) {
        margin: 0;
    }

    :global(nav) {
        display: none;
    }

    h1,
    h4,
    h5 p {
        font-family: Poppins, sans-serif;
    }

    a {
        text-decoration: none;
        font-weight: 600;

        margin-left: 48px;
    }

    button {
        cursor: pointer;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 24px 0;
    }

    .container {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;

        background: linear-gradient(to bottom right, #00093b, #361383);

        .content {
            padding: 0 64px;
            margin: 0 auto;

            h5 {
                font-weight: 300;
                font-size: 16px;
            }
        }

        .main {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 10%;

            .button-row {
                margin-top: 32px;

                button {
                    margin-right: 16px;
                    box-shadow: 0 0 2px 2px #000000cc;

                    background: #592cb6;
                    border-radius: 4px;
                    border: none;

                    padding: 8px 32px;

                    font-size: 16px;
                    font-weight: 600;
                }
            }

            img {
                width: 100%;
                max-width: 400px;
            }
        }

        .waves {
            position: absolute;
            transform: scaleX(2);
            bottom: 0;
            left: 0;
            right: 0;

            overflow: hidden;

            height: 25vh;
            width: 100%;
        }
    }

    .how-it-works {
        padding: 64px;
        background: linear-gradient(#f2fbff, #e7f5ff);

        //         background: linear-gradient(180deg, #E5E5E5 6.77%, rgba(41, 101, 255, 0.18) 99.99%, rgba(148, 41, 255, 0.53) 100%);
        // filter: blur(200px);

        //         display: flex;

        .content {
            max-width: 1200px;
            margin: auto;
            display: flex;

            .cards {
                flex: 1;
                margin-right: 32px;

                .step-card {
                    // max-width: 400px;

                    transition: all 0.3s;
                    background: linear-gradient(#8d50cf, #6e2bb6);

                    display: flex;

                    padding: 48px;

                    &:hover {
                        filter: saturate(200%);
                    }
                    // justify-content: space-around;
                }
            }

            .video {
                flex: 1;
                background: black;
            }
        }
    }

    .sign-up {
        background: linear-gradient(#f0f4f6, #f0f9ff);
        margin: 0;
        padding: 32px 0;

        .custom-button {
            width: 884px;
            height: 180px;
            background: #8c30f5;
            border-radius: 16px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            position: relative;
            background-image: url("images/button_background.svg");
            background-repeat: no-repeat;
            background-position: center;

            margin: 32px auto;

            .form {
                margin-top: 24px;

                input {
                    margin: 0;
                    height: 40px;
                    background: #f4f5f7;
                    border-radius: 5px 0px 0px 5px;
                    border: none;

                    margin-right: -8px;
                    padding: 0 16px;
                    width: 220px;

                    color: black;
                }

                button {
                    background: #18191f;
                    border-radius: 0px 5px 5px 0px;
                    border: none;

                    padding: 12px 24px;
                    font-weight: 600;
                }
            }
        }
    }
</style>
