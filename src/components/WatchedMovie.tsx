import type { MovieType } from "../types"

interface WatchedMovieProps {
  movie: MovieType
}

const WatchedMovie = (props: WatchedMovieProps) => {
  const { movie } = props
  const { Title, imdbRating, userRating, runtime, Poster } = movie

  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
      </div>
    </li>
  )
}

export default WatchedMovie