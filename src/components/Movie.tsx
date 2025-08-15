import type { MovieType } from "../types"

interface MovieProps {
  movie: MovieType
}

const Movie = (props: MovieProps) => {
  const { movie } = props
  const { Title, Year, Poster } = movie

  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  )
}

export default Movie