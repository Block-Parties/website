<script lang="ts">
</script>

<main>
    <h1>Block Parties</h1>

    <div>
        <h3>A <em>Revolution</em> in Investing</h3>
        <p>Leveraging the blockchain to make investing as <em>safe</em>, <em>easy</em>, and <em>social</em> as ever.</p>
    </div>

    <div class="email-form">
        <h5>Reserve your seat in the limited access beta</h5>
        <div>
            <input type="email" />
            <button>Submit</button>
        </div>
        <p>We won't use your email for anything other than letting you know when the beta opens.</p>
    </div>
</main>

<style lang="scss">
    // :root {
    //     font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    //         "Helvetica Neue", sans-serif;
    // }

    h1,
    h3,
    h5,
    p {
        color: white;
    }

    :global(body) {
        margin: 0;
        height: 100vh;
        background: linear-gradient(235.71deg, #400a84 7.8%, #1b0a30 92.44%);
    }

    main {
        text-align: center;
        padding: 1em;
        margin: auto;
    }

    .email-form {
        width: 459px;
        height: 171px;
        margin: auto;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 24px;

        background: linear-gradient(0deg, #040a11, #040a11), #0352af;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;

        h5 {
            margin: 0;
        }

        input {
            height: 48px;

            border: none;
            background: rgba(142, 145, 148, 0.1);
            border-radius: 4px;
            color: white;
        }

        button {
            height: 48px;
            border: none;
            background: #400a84;
            border-radius: 4px;

            padding: 8px;
            color: white;
        }

        p {
            font-size: 12px;
            font-weight: 300;
        }
    }
</style>
