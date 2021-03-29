<script>
    import ModalPopup from "./ModalPopup.svelte"
    import Tag from "./Tag.svelte"

    let showPopup = false
</script>

<div class="outer" on:click={() => (showPopup = true)}>
    <div class="chart">CHART GOES HERE</div>

    <div class="bottom-half">
        <div class="title-row">
            <h4>Tech Dudez</h4>
            <Tag text="HIGH" color={"red"} />
        </div>

        <p class="description">This is a short description of the club. It should be about a line.</p>

        <div class="tags">
            <div>
                <Tag text="Tech" color="green" />
            </div>
            <div>
                <Tag text="Oil" color="orange" />
            </div>
            <div>
                <Tag text="Energy" color="purple" />
            </div>
        </div>

        <div class="footer">
            <div>O O O O</div>
            <p>$15k - $50k invested</p>
        </div>
    </div>
</div>

{#if showPopup}
    <ModalPopup dismiss={() => (showPopup = false)} />
{/if}

<style lang="scss">
    .outer {
        transition: all 0.25s;
        cursor: pointer;
        position: relative;
        background: blue;
        width: 400px;
        height: 400px;

        border-radius: 4px;
        background: #023b70;
        box-shadow: 0 0 1px 2px #00000066;

        &:hover {
            box-shadow: 0 2px 2px 4px #00000066;
            background: #023b70dd;

            // border: 2px solid white;
        }
    }

    .chart {
        height: 40%;
        background: green;
        border-radius: 4px 4px 0 0;
    }

    .bottom-half {
        padding: 16px;

        .title-row {
            display: flex;
            justify-content: space-between;

            h4 {
                color: white;
            }
        }

        .description {
            font-size: 14px;
            font-weight: 300;

            margin: 16px 0;
        }

        .tags {
            display: flex;

            div {
                margin-right: 8px;
            }
        }

        .tags {
            position: absolute;

            bottom: 76px;
        }

        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            border-radius: 0 0 4px 4px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.25);

            p {
                font-weight: 600;
            }
        }
    }
</style>
