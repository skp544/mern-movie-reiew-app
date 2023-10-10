import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// api
import { deleteMovie, geMovieForUpdate, getMovies } from "../../api/movie";

// components
import { ConfirmModal, MovieListItem, UpdateMovie } from "../";

const pageNo = 0;
const limit = 5;

const LatestUploads = () => {
  const [movies, setMovies] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchLatestUploads = async () => {
    const { success, message, movies } = await getMovies(pageNo, limit);

    if (!success) {
      return toast.error(message);
    }

    setMovies([...movies]);
  };

  const handleOnDeleteClick = (movie) => {
    setShowConfirmModal(true);
    setSelectedMovie(movie);
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
    fetchLatestUploads();
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

  const handleOnEditClick = async ({ id }) => {
    const { success, message, movie } = await geMovieForUpdate(id);

    if (!success) {
      return toast.error(message);
    }

    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <>
      <div className=" bg-white dark:shadow dark:bg-secondary shadow p-5 rounded col-span-2">
        <h2 className=" mb-2 text-2xl font-semibold text-primary dark:text-white ">
          Recent Uploads
        </h2>

        <div className=" space-y-3">
          {movies.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              onDeleteClick={() => {
                handleOnDeleteClick(movie);
              }}
              onEditClick={() => {
                handleOnEditClick(movie);
              }}
              onOpenClick={() => {}}
            />
          ))}
        </div>
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

export default LatestUploads;
