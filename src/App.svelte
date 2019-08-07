<script>
	import MovieList from './MovieList.svelte';
	import ListItem from './ListItem.svelte';
	import { store } from './Store';

	let movieName = '';
	let watched, unwatched;

	store.subscribe(newState => {
		const movieLists = newState;
		watched = movieLists.watched;
		unwatched = movieLists.unwatched;
	});

	function addMovie () {
		if (unwatched.indexOf(movieName) === -1) {
			const newLists = {
				watched,
				unwatched: [...unwatched, movieName]
			};
			store.set(newLists);
			movieName = '';
		}
	}

	function removeUnwatchedMovie (event) {
		const movie = event.detail.movie;
		const index = unwatched.indexOf(movie);
		unwatched.splice(index, 1);
		store.set({
			watched,
			unwatched
		});
	}

	function removeWatchedMovie (event) {
		const movie = event.detail.movie;
		const index = watched.indexOf(movie);
		watched.splice(index, 1);
		store.set({
			watched,
			unwatched
		});
	}

	function onSeenMovie (event) {
		const {movie} = event.detail;

		const index = unwatched.indexOf(movie);
		watched.push(unwatched.splice(index, 1));
		store.set({
			watched,
			unwatched
		});
	}
	function onNotSeenMovie (event) {
		const {movie} = event.detail;

		const index = watched.indexOf(movie);
		unwatched.push(watched.splice(index, 1));
		store.set({
			watched,
			unwatched
		});
	}
</script>

<style>
	h1 {
		color: black;
	}

	.lists {
		display: flex;
	}

	.lists > div:first-of-type {
		margin-right: 30px;
	}
</style>

<h1>My Watchlist</h1>
<input type="text" bind:value={movieName} on:keydown="{e => e.which === 13 ? addMovie() : undefined}">
<button on:click={addMovie}>Add movie to list</button>
<div class="lists">
	<div>
		<MovieList list={unwatched} let:item={movie}>
			<span slot="title">Movies to see</span>
			<ListItem name={movie} on:remove={removeUnwatchedMovie} seen={false} on:visibility={onSeenMovie}></ListItem>
			<p slot="placeholder">Don't like movies?</p>
		</MovieList>
	</div>
	<div>
		<MovieList list={watched} let:item={movie}>
			<span slot="title">Movies seen</span>
			<ListItem name={movie} on:remove={removeWatchedMovie} seen={true} on:visibility={onNotSeenMovie}></ListItem>
			<p slot="placeholder">You got to keep up</p>
		</MovieList>
	</div>
</div>

