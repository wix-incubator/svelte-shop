<script>
    import { onMount } from 'svelte';
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import { crossfade, fade } from 'svelte/transition';
    import ListItem from './ListItem.svelte';
    import { toggleWatch, removeMovie } from './Store';

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(200 * d),
        fallback() {
            return {
                duration: 200,
                easing: quintOut,
                css: t => `
					opacity: ${t};
					transform: scale(${t});
				`
            };
        }
    });

    export let list = [];
    export let duplicate = null;
    let placeholderWait = null;
    let isDirty = false;

    $: if (list.length) {
        isDirty = true;
    }

    $: if (isDirty && list.length === 0) {
        placeholderWait = new Promise(res => setTimeout(res, 200));
    }

    function onToggleVisibility (event) {
        const {movie} = event.detail;
        toggleWatch(movie);
    }

    function onRemove(event) {
        const { movie } = event.detail;
        removeMovie(movie);
    }
</script>

<div class="container">
    <h2>
        <slot name="title"></slot>
    </h2>
    <div class="listwrapper">
        {#if list.length}
            <ul>
                {#each list as movie (movie.id)}
                    <li in:receive="{{key: movie.id}}"
                        out:send="{{key: movie.id}}" animate:flip
                        class:duplicate="{duplicate === movie.id}">
                        <ListItem name={movie.id} on:remove={onRemove} seen={movie.watched} on:visibility={onToggleVisibility} />
                    </li>
                {/each}
            </ul>
        {:else}
            {#await placeholderWait}
            {:then}
                <p in:fade="{{duration: 0}}">
                    <slot name="placeholder" />
                </p>
            {/await}
        {/if}
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .container {
        display: flex;
        flex-direction: column;
        padding: 6px;
        --placeholderColor: rgb(114, 115, 133);
        --itemBorderColor: rgba(128, 128, 128, 0.55);
    }

    h2 {
        padding-bottom: 16px;
        border-bottom: 1px solid var(--placeholderColor);
        margin-bottom: 24px;
    }

    .listwrapper {
        width: 230px;
        padding: 20px;
        background-color: rgba(207, 208, 231, 0.3);
        border-radius: 3px;
        min-height: 87px;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        position: relative;
    }

    li {
        border: 1px solid var(--itemBorderColor);
        padding: 3px 6px;
        background-color: rgba(207, 208, 231, 0.5);
        border-radius: 5px;
        margin: 6px 0;
    }

    li.duplicate {
        animation: blink .8s ease-in;
    }

    p {
        color: var(--placeholderColor);
        padding: 5px 6px 6px;
        margin: 6px 0;
    }

    @keyframes blink {
        0%{
            box-shadow: inset 0 0 2px red;
            border-color: red;
        }

        49%{
            box-shadow: none;
            border-color: var(--itemBorderColor);
        }

        50%{
            box-shadow: inset 0 0 2px red;
            border-color: red;
        }

        100%{
            box-shadow: none;
            border-color: var(--itemBorderColor);
        }
    }
</style>
