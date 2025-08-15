import type { MovieType } from "../types"
import Movie from "./Movie"

interface MovieListProps {
  movies: MovieType[]
}

const MovieList = (props: MovieListProps) => {
  const { movies } = props

  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  )
}

export default MovieList