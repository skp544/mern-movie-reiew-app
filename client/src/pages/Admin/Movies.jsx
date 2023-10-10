import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import {
  ConfirmModal,
  MovieListItem,
  NextAndPrevButton,
  UpdateMovie,
} from "../../components";

// api
import { deleteMovie, geMovieForUpdate, getMovies } from "../../api/movie";

let currentPageNo = 0;
const limit = 6;

const Movies = () => {
  // states
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const handleOnEditClick = async ({ id }) => {
    const { success, message, movie } = await geMovieForUpdate(id);

    if (!success) {
      return toast.error(message);
    }

    setSelectedMovie(movie);

    setShowUpdateModal(true);
  };

  // function for deleting movie
  const handleOnDeleteClick = (movie) => {
    setShowConfirmModal(true);
    setSelectedMovie(movie);
  };

  const handleOnUpdate = (movie) => {
    const updatedMovie = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });

    setMovies([...updatedMovie]);
  };

  const hideUpdateForm = () => {
    setShowUpdateModal(false);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);

    const { success, message } = await deleteMovie(selectedMovie.id);

    setBusy(false);

    if (!success) {
      return toast.error(message);
    }
    toast.success(message);
    hideConfirmModal();
    fetchMovies(currentPageNo);
  };

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className=" space-y-5 p-5">
        {movies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onEditClick={() => handleOnEditClick(movie)}
              onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}

        <NextAndPrevButton
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        title={"Are you sure?"}
        subtitle={"This action will remove this movie permanently"}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        busy={busy}
      />
      <UpdateMovie
        onSuccess={handleOnUpdate}
        visible={showUpdateModal}
        initialState={selectedMovie}
        onClose={hideUpdateForm}
      />
    </>
  );
};

export default Movies;
