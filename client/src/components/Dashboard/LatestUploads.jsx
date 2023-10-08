import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

const LatestUploads = () => {
  return (
    <div className=" bg-white dark:shadow dark:bg-secondary shadow p-5 rounded col-span-2">
      <h2 className=" mb-2 text-2xl font-semibold text-primary dark:text-white ">
        Recent Uploads
      </h2>

      <MovieListItem
        movie={{
          poster:
            "https://images.unsplash.com/photo-1682687981922-7b55dbb30892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
          title: "lorem",
          genres: ["action", "Adventur"],
          status: "private",
        }}
        onDeleteClick={() => {}}
        onEditClick={() => {}}
        onOpenClick={() => {}}
      />
    </div>
  );
};

const MovieListItem = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className=" w-full border-b ">
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
            <div className=" flex item-center space-x-2 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} className="" type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} className="" type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} className="" type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LatestUploads;
