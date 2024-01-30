document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '4b54680a';
    const baseUrl = 'https://www.omdbapi.com/';
    const movieGenreLabel = document.getElementById('movieGenreLabel');
    const movieGrid = document.getElementById('movie-grid');

    const fetchPopularMovies = async () => {
        try {
            const url = `${baseUrl}?apikey=${apiKey}&s=popular`; // Example: Fetch popular movies
            const response = await fetch(url);
            const data = await response.json();

            // Display popular movies
            if (data.Search) {
                const movies = data.Search.slice(0, 100); // Get the first 100 movies
                movieGenreLabel.innerText = 'Popular Movies';
                displayMovies(movies);
                
            } else {
                movieGenreLabel.innerText = 'No results found.';
                movieGrid.innerHTML = ''; // Clear previous results
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    fetchPopularMovies();

    // Function to fetch movies by search term
    const fetchMovies = async (searchTerm) => {
        try {
            const url = `${baseUrl}?apikey=${apiKey}&s=${searchTerm}`;
            const response = await fetch(url);
            const data = await response.json();

            // Display movies
            if (data.Search) {
                const movies = data.Search;
                movieGenreLabel.innerText = `Search Results for: ${searchTerm}`;
                displayMovies(movies);
            } else {
                movieGenreLabel.innerText = 'No results found.';
                movieGrid.innerHTML = ''; // Clear previous results
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Function to display movies in the grid
    const displayMovies = (movies) => {
        movieGrid.innerHTML = ''; // Clear previous results
    
        const movieCards = movies.map(movie => {
            const movieCard = document.createElement('div');
    
            movieCard.innerHTML = `
                <div class="card rounded-5 border Larger shadow-lg p-1 mb-5 bg-body-tertiary flex">
                    <img src="${movie.Poster}" class="card-img-top border rounded-5" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                    </div>
                </div>
            `;
    
            return movieCard;
        });
    
        movieGrid.append(...movieCards);
    };
    

    // Handle form submission
    const searchForm = document.querySelector('form[role="search"]');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchForm.querySelector('input[type="search"]').value;
        fetchMovies(searchTerm);
    });


    const fetchMoviesByGenre = async (genre) => {
        try {
            const apiKey = 'acb7edbffd7db0d34438b5bccc4b7854'; // Replace with your TMDb API key
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`;
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);
            
            // Display movies
            if (data.results) {
                const movies = data.results;
                movieGenreLabel.innerText = `Genre: ${genre}`;
                displayTMDbMovies(movies);
            } else {
                movieGenreLabel.innerText = 'No results found.';
                movieGrid.innerHTML = ''; // Clear previous results
            }
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
        }
    };

    const displayTMDbMovies = (movies) => {
        movieGrid.innerHTML = ''; // Clear previous results
    
        const movieCards = movies.map(movie => {
            const movieCard = document.createElement('div');
    
            movieCard.innerHTML = `
                <div class="card rounded-5 border Larger shadow-lg p-1 mb-5 bg-body-tertiary ">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top border rounded-5" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.release_date}</p>
                    </div>
                </div>
            `;
    
            return movieCard;
        });
    
        movieGrid.append(...movieCards);
    };

    // Add event listener to genre links
    const genreDropdown = document.querySelector('.dropdown-menu');
    genreDropdown.addEventListener('click', (event) => {
        if (event.target.classList.contains('dropdown-item')) {
            const selectedGenre = event.target.innerText;
            fetchMoviesByGenre(selectedGenre);
        }
    });
});
