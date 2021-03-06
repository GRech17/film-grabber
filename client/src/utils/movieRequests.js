const baseUrl = "https://api.themoviedb.org/3/"
const trendingPath = "trending/movie/week";

export const movieSearchPath = "search/multi"
export const movieDetailPath = "movie/"

const getUrl = (path) => {
    return `${baseUrl}${path}?api_key=be7a826a76009582fd9bfd917bb48f21`
}

export const getTrending = async (page = 1) => {
    const url = `${getUrl(trendingPath)}&page=${page}`;
    const res = await (await fetch(url)).json();

    mapResultsIds(res);
    
    return res;
};

export const getMovie = async (id) => {
    const path = movieDetailPath + id;
    const url = getUrl(path);

    const movie = await (await fetch(url)).json();

    return {...movie, id: `${movie.id}`}
};

export const searchMovies = async (query, page) => {
    const url = `${getUrl(movieSearchPath)}&query=${query}&page=${page}`;

    const res = await (await fetch(url)).json();

    mapResultsIds(res);

    return res;
};

export const mapResultsIds = (res) => {
    res.results = res.results.map((movie) => ({...movie, id: `${movie.id}`}));
}