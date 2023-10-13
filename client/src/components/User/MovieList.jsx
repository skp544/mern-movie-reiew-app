import { GridContainer } from "../";
import { AiFillStar } from "react-icons/ai";
import { trimTitle } from "../../utils/helper";
import { Link } from "react-router-dom";

const MovieList = ({ movies = [], title }) => {
  if (!movies.length) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl pt-5 text-center mb-5  dark:text-white text-secondary font-semibold ">
        {title}
      </h2>
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

const ListItem = ({ movie }) => {
  const { title, reviews, id } = movie;
  return (
    <Link to={`/movie/${id}`}>
      <img
        src={movie?.poster}
        alt={title}
        className=" aspect-video object-cover"
      />
      <h2
        className=" text-lg dark:text-white text-secondary font-semibold mt-2 ml-3"
        title={title}
      >
        {trimTitle(title)}
      </h2>

      {reviews?.ratingAvg ? (
        <p className="flex items-center ml-3 gap-2 dark:text-highlight-dark text-highlight ">
          <span>{reviews?.ratingAvg}</span>
          <AiFillStar className="text-yellow-500" />
        </p>
      ) : (
        <p className=" ml-3 dark:text-highlight-dark text-highlight">
          No Reviews
        </p>
      )}
    </Link>
  );
};

export default MovieList;
