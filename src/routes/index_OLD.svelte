<script lang="ts">
    // import Api from "$lib/api/beta"
    // import axios from "axios"

    import ScrollButton from "$lib/components/splash/ScrollButton.svelte"

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
</script>

<svelte:head>
    <title>Block Parties</title>
    <meta name="og:title" content="Block Parties" />
    <meta name="og:description" content="Invest with others safely and securely, powered by blockchain technology." />
</svelte:head>

<main>
    <h1>Block Parties</h1>

    <div>
        <h3>An <b>Evolution</b> in Investing... coming soon</h3>
        <p>
            Leveraging the blockchain to make group investing as <b>secure</b>, <b>easy</b>, and <b>social</b> as ever.
        </p>
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

    <div class="scroll-button">
        <ScrollButton />
    </div>
</main>

<style lang="scss">
    :global(nav) {
        display: none;
    }

    :global(body) {
        margin: 0;
        height: 100vh;
        background: linear-gradient(235.71deg, #400a84 7.8%, #1b0a30 92.44%);
    }

    main {
        padding: 1em;
        width: 480px;
        margin: auto;
        position: absolute;
        top: calc(50% - 200px);
        left: calc(50% - 240px);

        h3 {
            margin-top: 16px;
            margin-bottom: 8px;
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
</style>
