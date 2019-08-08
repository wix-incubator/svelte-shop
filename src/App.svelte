<script>
	import MovieList from './MovieList.svelte';
	import { store, newMovie } from './Store';

	let movieName = '';
	let moviesList = [];
	let duplicate;

	store.subscribe(({movies}) => {
		moviesList = movies;
	});

	$: {
		movieName;
		duplicate = '';
	}

	function addMovie () {
		duplicate = '';
		if (newMovie(movieName) > -1) {
			movieName = '';
		} else {
			setTimeout(() => duplicate = movieName.trim());
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

	span {
		line-height: 1.5;
	}
</style>

<h1>My Watchlist</h1>
<input type="text" bind:value={movieName} on:keydown="{e => e.which === 13 ? addMovie() : undefined}">
<button on:click={addMovie}>Add movie to list</button>
<div class="lists">
	<div>
		<MovieList list="{moviesList.filter(movie => !movie.watched)}" bind:duplicate={duplicate}>
			<span slot="title">Movies to see</span>
			<span slot="placeholder">Don't like movies?</span>
		</MovieList>
	</div>
	<div>
		<MovieList list="{moviesList.filter(movie => movie.watched)}" bind:duplicate={duplicate}>
			<span slot="title">Movies seen</span>
			<span slot="placeholder">You got to keep up</span>
		</MovieList>
	</div>
</div>

