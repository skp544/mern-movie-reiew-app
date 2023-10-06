import { Routes, Route } from "react-router-dom";
import { Actors, Dashboard, Movies, NotFound } from "../pages";
import { AdminNavbar, Header, MovieUpload } from "../components";
import { useState } from "react";
import ActorUpload from "../components/Modals/ActorUpload";

const AdminNavigator = () => {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <AdminNavbar />
        <div className=" flex-1 p-2 max-w-screen-xl">
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
};

export default AdminNavigator;
