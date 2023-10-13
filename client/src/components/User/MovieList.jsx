import { GridContainer, RatingStar } from "../";
import { AiFillStar } from "react-icons/ai";
import { trimTitle } from "../../utils/helper";
import { Link } from "react-router-dom";

const MovieList = ({ movies = [], title, className = "" }) => {
  const classes = className
    ? className
    : "text-center dark:text-white text-secondary";

  if (!movies.length) {
    return null;
  }

  return (
    <div className=" pb-4">
      <h2 className={`text-2xl my-5 font-semibold ${classes}`}>{title}</h2>
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
      <RatingStar rating={reviews?.ratingAvg} />
    </Link>
  );
};

export default MovieList;
