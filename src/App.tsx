import { useEffect, useState } from "react"
import Box from "./components/Box"
import Main from "./components/Main"
import MovieList from "./components/MovieList"
import Navbar from "./components/Navbar"
import NumResults from "./components/NumResults"
import Search from "./components/Search"
import WatchedMoviesList from "./components/WatchedMoviesList"
import WatchedSummary from "./components/WatchedSummary"
import { tempMovieData, tempWatchedData } from "./constants/movies"
import type { MovieType } from "./types"
import Loader from "./components/Loader"

const KEY = "f84fc31d";

const App = () => {
  const [query, setQuery] = useState<string>('all')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieType[]>([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchMovies = async () => {
      try {
        setIsLoading(true)

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal
        })

        if (!res.ok) throw new Error("Something went wrong with fetching movies")

        const data = await res.json()

        if (data.Response === 'False') throw new Error("Movie not found")

        setMovies(data.Search)
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      return
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [query])


  return (
    <>
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} />
          )}
        </Box>
        <Box>
          <WatchedSummary watched={tempWatchedData} />
          <WatchedMoviesList watched={tempWatchedData} />
        </Box>
      </Main>
    </>
  )
}

export default App
