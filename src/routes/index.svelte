<script lang="ts">
    function showExtension() {
        // open("https://google.com", "blank")
        alert("Coming soon!")
    }

    function showParties() {
        location.href = "/browse"
    }

    function scrollDown() {
        const elem = window.document.getElementsByClassName("how-it-works")[0]
        scrollTo({ top: elem.getClientRects().item(0).top, behavior: "smooth" })
    }

    let email: string
    async function signUp() {
        await fetch("https://api2.blockparties.io/join-beta", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                createdAt: new Date(),
            }),
        })

        alert("Thank you for signing up!")
    }
</script>

<div class="container">
    <div class="content">
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
                <img src="/images/people_circle.svg" alt="" />
            </div>
        </div>
    </div>

    <!-- <div class="waves">
        <Waves />
    </div> -->
</div>

<div class="sign-up">
    <div class="custom-button" style="background-image: url({'images/button_background.svg'})">
        <h1>Join 100+ people in the waitlist</h1>

        <div class="form">
            <input bind:value={email} placeholder="Your email address" />
            <button on:click={signUp}>Join the waitlist</button>
        </div>
    </div>
</div>

<div class="white-wrapper">
    <div class="explanation-section">
        <h1>Introducing Party Buying</h1>
        <h2>BUY INTO NFTS WITH AS LITTLE AS $1</h2>

        <div class="sections">
            <div>
                <h5>Vote</h5>
                <p>Vote for your favorite NFTs on the waitlist to raise them to the top</p>
            </div>

            <div>
                <h5>Buy</h5>
                <p>Buy part of an NFT by joining a public party or creating your own private party with friends</p>
            </div>

            <div>
                <h5>Resell</h5>
                <p>We relist the NFT for the party, and securely distribute the profits</p>
            </div>

            <div class="img-container">
                <img src="/images/shapes2.svg" alt="" />
            </div>
        </div>
    </div>
</div>

<div class="blog-section">
    <h3>LATEST NEWS</h3>
    <h1>From Our Blog</h1>

    <div
        class="article"
        on:click={() => open("https://medium.com/block-parties/introducing-block-parties-821d755a68ca", "blank")}
    >
        <img src="/images/article.png" alt="article" />
        <h2>Introducing Block Parties</h2>
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
    h1 {
        font-size: 48px;
        line-height: 1.25;
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
        // font-family: Poppins, sans-serif;
    }

    a {
        text-decoration: none;
        font-weight: 600;

        margin-left: 48px;
    }

    button {
        cursor: pointer;
    }

    .container {
        position: relative;
        width: 100%;
        overflow: hidden;

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
            margin-top: min(6%, 96px);
            margin-bottom: min(6%, 96px);

            .button-row {
                margin-top: 32px;

                button {
                    margin-right: 16px;
                    box-shadow: 0 0 2px 1px #00000044;

                    background: #8859ec;
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

                animation: rotation 30s infinite linear;
            }
        }
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
        margin: 0;
        width: 100%;

        h1,
        button {
            color: white;
        }

        .custom-button {
            height: 180px;
            background: #8c30f5;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            position: relative;
            background-image: url("/images/button_background.svg");
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            // background: ;

            // margin: 32px auto;
            margin: auto;
            margin-top: 0;

            // box-shadow: 0 0 3px 1px #575757aa;

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

    .blog-section {
        color: white;
        background: #2c2c2c;
        margin: 0;
        padding: 32px 0;

        display: flex;
        flex-direction: column;
        align-items: center;

        .article {
            transition: 0.5s all;
            cursor: pointer;
            margin-top: 24px;

            h2 {
                font-weight: 400;
                margin: 8px auto;
            }

            &:hover {
                transform: scale(1.05);
            }
        }
    }

    .white-wrapper {
        background: #fafafa;
    }

    .explanation-section {
        max-width: 1080px;
        margin: auto;
        padding: 32px;
        h2 {
            font-weight: 300;
            margin-top: 4px;
        }

        .sections {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 24px;

            div {
                flex: 2;
                margin: 0 32px;

                h5 {
                    color: #18191fcc;
                    font-size: 24px;
                    margin-bottom: 16px;
                }

                p {
                    font-size: 20px;
                }
            }

            .img-container {
                flex: 1;

                img {
                    width: 200%;
                    margin-left: -64px;
                    // margin-bottom: -16px;
                }
            }
        }
    }

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
</style>
