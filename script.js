const containers = {
	nowPlaying: document.querySelector(".nowPlaying"),
	popular: document.querySelector(".popular"),
	topRated: document.querySelector(".topRated"),
	upcoming: document.querySelector(".upcoming"),
};

function createMovieItem(imageUrl, numMovies, index) {
	const item = document.createElement("div");
	item.className = "item";

	const poster = document.createElement("img");
	poster.src = imageUrl;
	poster.alt = "Movie Poster";

	item.style.animationDelay = `calc(var(--scroll-duration) / ${numMovies} * (${numMovies - index + 1}) * -1)`;

	item.appendChild(poster);
	return item;
}

const apiKey = "c70c2c6709bdbe1673fd7853df05d18d";

function fetchMovies(category) {
	const apiUrl = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	};

	fetch(apiUrl, options)
		.then((res) => res.json())
		.then((data) => {
			const movies = data.results.slice(0,8);
			const numMovies = movies.length;

			for (let i = 0; i < movies.length; i++) {
				const movie = movies[i];
				const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				const movieItem = createMovieItem(imageUrl, numMovies, i);

				switch (category) {
					case "now_playing":
						containers.nowPlaying.appendChild(movieItem);
						break;
					case "popular":
						containers.popular.appendChild(movieItem);
						break;
					case "top_rated":
						containers.topRated.appendChild(movieItem);
						break;
					case "upcoming":
						containers.upcoming.appendChild(movieItem);
						break;
				}
			}
		})
		.catch((err) => console.error(err));
}

fetchMovies("now_playing");
fetchMovies("popular");
fetchMovies("top_rated");
fetchMovies("upcoming");
