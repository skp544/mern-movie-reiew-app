import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Container, RatingStar, RelatedMovies } from "../components";

import { getSingleMovie } from "../api/movie";
import { convertDate, convertReviewCount } from "../utils/helper";
import { useAuth } from "../hooks";

const SingleMovie = () => {
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);

  const { movieId } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const fetchMovie = async () => {
    const { success, messgae, movie } = await getSingleMovie(movieId);

    if (!success) {
      return toast.error(messgae);
    }
    setReady(true);
    setMovie({ ...movie });
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) {
      toast.error("You are not logged in!");
      return navigate("/auth/sign-in");
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (!ready) {
    return (
      <div className="  h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className=" text-light-subtle dark:text-dark-subtle animate-pulse text-2xl">
          Please Wait...
        </p>
      </div>
    );
  }

  const {
    trailer,
    poster,
    title,
    id,
    reviews = {},
    storyline,
    director = {},
    writers = [],
    cast = [],
    language,
    releaseDate,
    genres = [],
    type,
  } = movie;

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container>
        {/* trailer */}
        <video poster={poster} controls src={trailer} />

        {/* title  */}
        <div className=" flex justify-between items-center">
          <h2 className=" text-4xl text-highlight dark:text-highlight-dark py-3">
            {title}
          </h2>
          <div className=" flex flex-col justify-center items-end">
            <RatingStar rating={reviews?.ratingAvg} />
            <Link
              className="text-highlight dark:text-highlight-dark  hover:underline"
              to={`/movie/reviews/${id}`}
            >
              {convertReviewCount(reviews.reviewCount)} Reviews
            </Link>
            <button
              className="text-highlight dark:text-highlight-dark hover:underline "
              type="button"
              onClick={handleOnRateMovie}
            >
              Rate The Movie
            </button>
          </div>
        </div>

        {/* storyline  */}
        <div className=" space-y-3">
          <p className=" text-light-subtle dark:text-dark-subtle text-lg">
            {storyline}
          </p>
          {/* director */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Director:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {director?.name}
            </p>
          </div>

          {/* writer */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Writers:
            </p>
            <div className="flex gap-2">
              {writers.map((w, i) => (
                <p
                  className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                  key={i}
                >
                  {w.name}
                </p>
              ))}
            </div>
          </div>

          {/* cast */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Cast:
            </p>
            <div className="flex gap-2">
              {cast.map(
                (c, i) =>
                  c.leadActor && (
                    <p
                      className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                      key={i}
                    >
                      {c.profile.name}
                    </p>
                  )
              )}
            </div>
          </div>

          {/* language */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Language:
            </p>
            <p className="text-highlight dark:text-highlight-dark  ">
              {language}
            </p>
          </div>

          {/* release date */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Release Date:
            </p>
            <p className="text-highlight dark:text-highlight-dark  ">
              {convertDate(releaseDate)}
            </p>
          </div>

          {/* genres */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Genres:
            </p>
            <div className="flex gap-2">
              {genres.map((g, i) => (
                <p className="text-highlight dark:text-highlight-dark " key={i}>
                  {g}
                </p>
              ))}
            </div>
          </div>

          {/* type */}
          <div className=" flex gap-2 text-lg">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Type:
            </p>
            <p className="text-highlight dark:text-highlight-dark  ">{type}</p>
          </div>
        </div>

        {/* all members */}
        <div className="mt-5">
          <h2 className="text-light-subtle dark:text-dark-subtle font-semibold mb-2  text-2xl">
            Cast & Crew:
          </h2>
          <div className="grid grid-cols-8  gap-5 place-items-center">
            {cast.map((c, i) => {
              return (
                <div key={i} className=" flex flex-col items-center">
                  <img
                    src={c.profile?.avatar}
                    alt=""
                    className=" aspect-square w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <div className="text-center ">
                    <p className=" whitespace-nowrap text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                      {c.profile.name}
                    </p>
                    <span className=" text-light-subtle dark:text-dark-subtle">
                      as
                    </span>
                    <p className=" whitespace-nowrap text-highlight dark:text-highlight-dark ">
                      {c.roleAs}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* related movies */}
        <RelatedMovies movieId={id} />
      </Container>
    </div>
  );
};

export default SingleMovie;
