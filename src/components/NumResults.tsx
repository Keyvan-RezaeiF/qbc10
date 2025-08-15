import type { MovieType } from "../types"

interface NumResultsProps {
  movies: MovieType[]
}

const NumResults = (props: NumResultsProps) => {
  const { movies } = props
  const numResults = movies?.length || 0

  return (
    <p className="num-results">
      Found <strong>{numResults}</strong> results
    </p>
  )
}

export default NumResults