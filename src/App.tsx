import MovieListPage from "./features/movie/pages/MovieListPage"
import Navbar from "./features/NavBar/NavBar"


type Props = {}

const App = (props: Props) => {
  return (
   <MovieListPage searchQuery={""}/>
  )
}

export default App