import { useEffect, useState } from "react";
import { MovieListItem, NextAndPrevButton } from "../../components";
import { getMovies } from "../../api/movie";
import toast from "react-hot-toast";

let currentPageNo = 0;
const limit = 6;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const fetchMovies = async (pageNo) => {
    const {
      success,
      message,
      movies: resMovies,
    } = await getMovies(pageNo, limit);

    if (!success) {
      return toast.error(message);
    }

    if (!resMovies.length) {
      // setCurrentPageNo(pageNo - 1);
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...resMovies]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) {
      toast.error("No More Movies!");
      return;
    }

    // setCurrentPageNo((prev) => prev + 1);
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) {
      currentPageNo = 0;
      setReachedToEnd(false);
      toast.error("You are on first page!");
      return;
    }
    setReachedToEnd(false);
    currentPageNo -= 1;

    fetchMovies(currentPageNo);
  };

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <div className=" space-y-5 p-5">
      {movies.map((movie) => {
        return <MovieListItem key={movie.id} movie={movie} />;
      })}

      <NextAndPrevButton
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
      />
    </div>
  );
};

export default Movies;
