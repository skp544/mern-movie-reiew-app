import { Routes, Route } from "react-router-dom";
import { Actors, Dashboard, Movies, NotFound } from "../pages";
import { AdminNavbar, Header } from "../components";

const AdminNavigator = () => {
  return (
    <div className="flex dark:bg-primary bg-white">
      <AdminNavbar />
      <div className=" flex-1 p-2 max-w-screen-xl">
        <Header onAddMovieClick={() => {}} onAddActorClick={() => {}} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;
