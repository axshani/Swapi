const API_URL = "https://swapi.dev/api"

export const getAllMovies = async () => {
    const res = await fetch(`${API_URL}/films`);
    const resJson = await res.json();
    const editedMovieList = resJson.results.map((movie) => ({
      id: Number(
        movie.url
          .split('/')
          .filter(Boolean)
          .pop()
      ),
      title: movie.title,
      openingCrawl: movie.opening_crawl,
      releaseDate: movie.release_date,
      director: movie.director,
      producer: movie.producer,
      fetchAllCharacters: getAllCharacters(movie.characters)
    }));
    return editedMovieList;
  };

export const getCharacter = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return JSON.stringify({ name: data["name"], height: data["height"], mass: data["mass"], hairColor: data["hair_color"], skinColor: data["skin_color"],
    eyeColor: data["eye_color"], birthYear: data["birth_year"] });
  } catch (error) {
    return { url, error: error.message };
  }
}

export const getAllCharacters = async (urls) => {
  const promises = urls.map(url => getCharacter(url))
  return Promise.all(promises);
}

