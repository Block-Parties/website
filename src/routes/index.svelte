<script lang="ts">
    async function submitEmail() {
        console.log("SUBMITTED EMAIL! THANKS!")
    }
</script>

<main>
    <h1>Block Parties</h1>

    <div>
        <h3>A <b>Revolution</b> in Investing... coming soon</h3>
        <p>Leveraging the blockchain to make investing as <b>safe</b>, <b>easy</b>, and <b>social</b> as ever.</p>
    </div>

    <div class="email-form">
        <h5>Reserve your seat in the limited access beta</h5>
        <br /><br />
        <div class="form-input">
            <input type="email" placeholder="Enter your email" />
            <button>Submit</button>
        </div>
        <p>We won't use your email for anything other than letting you know when beta opens.</p>
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
