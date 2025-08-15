import type { MovieType } from "../types"
import WatchedMovie from "./WatchedMovie"

interface WatchedMoviesListProps {
  watched: MovieType[]
}

const WatchedMoviesList = (props: WatchedMoviesListProps) => {
  const { watched } = props

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  )
}

export default WatchedMoviesList