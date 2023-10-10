import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

const MovieListItem = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster = "", title, genres = [], status } = movie;
  return (
    <table className=" w-full border-b   ">
      <tbody>
        <tr className=" mb-2">
          <td>
            <div className=" w-24">
              <img
                className=" rounded-t-md w-full object-cover aspect-video"
                src={poster}
                alt={title}
              />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h3 className=" capitalize font-semibold text-lg text-primary dark:text-white ">
                {title}
              </h3>
              <div className=" space-x-2">
                {genres.map((g, i) => {
                  return (
                    <span
                      key={i}
                      className="capitalize text-primary dark:text-white text-sm "
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className=" px-5">
            <p className=" capitalize text-primary dark:text-white ">
              {status}
            </p>
          </td>

          <td className="">
            <div className=" flex item-center space-x-2 text-primary dark:text-white text-lg ">
              <button
                onClick={onDeleteClick}
                className="hover:text-red-700 transition-all duration-200"
                type="button"
              >
                <BsTrash />
              </button>
              <button
                onClick={onEditClick}
                className="hover:text-orange-500 transition-all duration-20"
                type="button"
              >
                <BsPencilSquare />
              </button>
              <button
                onClick={onOpenClick}
                className="hover:text-green-500 transition-all duration-20"
                type="button"
              >
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default MovieListItem;
