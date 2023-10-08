import MovieListItem from "./MovieListItem";

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

export default LatestUploads;
