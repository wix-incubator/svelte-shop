<script>
	import MovieList from './MovieList.svelte';
	import { store, newMovie } from './Store';

	let movieName = '';
	let moviesList = [];

	store.subscribe(({movies}) => {
		moviesList = movies;
	});

	function addMovie () {
		if (newMovie(movieName) > -1) {
			movieName = '';
		}
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
		<MovieList list="{moviesList.filter(movie => !movie.watched)}" let:item={movie}>
			<span slot="title">Movies to see</span>
			<p slot="placeholder">Don't like movies?</p>
		</MovieList>
	</div>
	<div>
		<MovieList list="{moviesList.filter(movie => movie.watched)}" let:item={movie}>
			<span slot="title">Movies seen</span>
			<p slot="placeholder">You got to keep up</p>
		</MovieList>
	</div>
</div>

