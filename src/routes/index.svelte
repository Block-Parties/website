<script lang="ts">
    import Waves from "$lib/components/splash/Waves.svelte"

    function showExtension() {
        open("https://google.com", "blank")
    }

    function showParties() {
        location.href = "/browse"
    }

    function scrollDown() {
        const elem = window.document.getElementsByClassName("how-it-works")[0]
        scrollTo({ top: elem.getClientRects().item(0).top, behavior: "smooth" })
    }
</script>

<div class="noise">
    <img src="/images/noise.png" alt="" />
</div>

<div class="container">
    <div class="content">
        <div class="nav">
            <img style="display: none" src="images/button_background.svg" alt="" />
            <div style="display: flex; width: 240px; align-items: center;">
                <img src="images/blockparties_icon_black.svg" alt="logo" width="80px" />
                <h4>Block Parties</h4>
            </div>

            <div>
                <a style="cursor: pointer" on:click={scrollDown}>How it works</a>
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

                <h5>Buy and sell fractional NFTs with <span style="color: #592cb6"><b>Block Parties</b></span></h5>

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

<div class="bottom-half">
    <div class="how-it-works">
        <!-- <div class="waves-wrapper">
        <div class="waves">
            <Waves />
        </div>
    </div> -->

        <div class="content">
            <div class="cards">
                <div class="step-card" style="background: #ac69f7">
                    <div class="circle" style="background-image: url('images/abstract3.svg');" />
                    <div>
                        <h4>Step 1</h4>
                        <p>Browse the OpenSea marketplace.</p>
                    </div>
                </div>
                <div class="step-card" style="background: #9d4ff6">
                    <div class="circle" style="background-image: url('images/abstract2.svg');" />
                    <div>
                        <h4>Step 2</h4>
                        <p>Join or create a party and invest!</p>
                    </div>
                </div>
                <div class="step-card" style="background: #8c30f5">
                    <div class="circle" style="background-image: url('images/abstract1.svg');" />
                    <div>
                        <h4>Step 3</h4>
                        <p>Once the party is full, the NFT is purchased and listed for resale.</p>
                    </div>
                </div>
                <div class="step-card" style="background: #721bd4">
                    <div class="circle" style="background-image: url('images/abstract3.svg');" />
                    <div>
                        <h4>Step 4</h4>
                        <p>When the NFT gets sold, we distribute the profits to the party.</p>
                    </div>
                </div>
            </div>

            <div class="video">.</div>
        </div>
    </div>
</div>

<div class="sign-up">
    <div class="custom-button" style="background-image: url({'images/button_background.svg'})">
        <h1>Join 100+ people in the waitlist</h1>

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
        background: linear-gradient(
                150.81deg,
                rgba(43, 112, 216, 0.39) 17.62%,
                rgba(181, 180, 246, 0.73) 45.08%,
                rgba(80, 77, 240, 0.3) 99.97%,
                #f2dcbf 99.98%,
                #9113de 99.99%
            ),
            linear-gradient(
                150.81deg,
                rgba(117, 236, 229, 0.74) 26%,
                rgba(180, 180, 217, 0.73) 52.53%,
                rgba(80, 77, 240, 0.3) 99.97%,
                #f2dcbf 99.98%,
                #785191 99.99%
            );
        mix-blend-mode: soft-light;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    a,
    button,
    input {
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

        // background: linear-gradient(to bottom right, #00093b, #361383);
        // background-color: #80c4f1;
        // background: linear-gradient(#e1f4ff, #ccd1ff);

        h1,
        h3,
        h4,
        h5,
        a,
        p {
            color: black;
        }

        .content {
            padding: 0 64px;
            margin: 0 auto;

            p {
                font-weight: 200;
            }

            h5 {
                font-weight: 300;
                font-size: 16px;
                margin-top: 8px;
            }
        }

        .main {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: min(4%, 96px);

            .button-row {
                margin-top: 32px;

                button {
                    margin-right: 16px;
                    box-shadow: 0 0 3px 1px #000000aa;

                    background: #592cb6;
                    border-radius: 4px;
                    border: none;

                    padding: 8px 32px;

                    color: white;
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

    .bottom-half {
        // background: linear-gradient(to bottom, #c2c8ff, #4c73e0);
        // background: white;
    }

    .how-it-works {
        // background-image: url(data:image/png;base64,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);
        // background-color: #cfd4ff; //linear-gradient(#ccdce8, #bcc8ec);

        .waves-wrapper {
            .waves {
                transform: scaleX(2);
                overflow: hidden;
                height: 10vh;
                width: 100%;

                position: relative;
                top: -32px;
                // position: absolute;
                // top: 0;
            }
        }

        .content {
            max-width: 1200px;
            padding: 64px;
            margin: auto;
            display: flex;

            .cards {
                flex: 2;
                margin-right: 32px;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 0 2px 1px #4d4d4daa;

                color: white;

                .step-card {
                    transition: all 0.3s;
                    // background: linear-gradient(#ac69f7, #6e2bb6);

                    display: flex;
                    align-items: center;
                    padding: 32px 48px;
                    font-size: 12px;

                    &:hover {
                        filter: saturate(200%);
                    }

                    .circle {
                        min-width: 64px;
                        min-height: 64px;
                        border-radius: 50%;
                        background: rgba(176, 139, 255, 0.44);
                        margin-right: 32px;

                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    // justify-content: space-around;
                }
            }

            .video {
                flex: 3;
                background: black;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 0 2px 1px #4d4d4daa;
            }
        }
    }

    .sign-up {
        // background: linear-gradient(#bcc8ec, #babaee);
        // background-image: url(data:image/png;base64,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);
        // background-color: #cfd4ff; //linear-gradient(#ccdce8, #bcc8ec);

        margin: 0;
        margin-bottom: 32px;
        padding: 32px 0;

        // background: rgb(19, 19, 19);

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

            // margin: 32px auto;
            margin: auto;
            margin-top: 0;

            box-shadow: 0 0 3px 1px #575757aa;

            .form {
                margin-top: 24px;
                box-shadow: 0 0 2px 1px #4d4d4daa;
                border-radius: 6px;

                input {
                    margin: 0;
                    height: 40px;
                    background: #f4f5f7;
                    border-radius: 6px 0px 0px 6px;
                    border: none;

                    margin-right: -8px;
                    padding: 0 16px;
                    width: 220px;

                    color: black;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    background: #18191f;
                    border-radius: 0px 6px 6px 0px;
                    border: none;

                    padding: 12px 24px;
                    font-weight: 600;
                }
            }
        }
    }

    .noise {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        img {
            width: 100%;
            height: 100%;
        }

        mix-blend-mode: overlay;
        opacity: 0.1;
    }

    :global(nav) {
        display: none !important;
    }
</style>
