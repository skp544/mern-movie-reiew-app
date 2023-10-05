import { useState } from "react";
import {
  CastForm,
  CastModal,
  LiveSearch,
  ModalContainer,
  Submit,
  TagsInput,
  WritersModal,
} from "../";
import { results } from "../../utils/fakeData";
import { commonInputClasses } from "../../utils/theme";
import toast from "react-hot-toast";

const defaultMovieInfo = {
  title: "",
  storyline: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseData: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
      <img
        src={result.avatar}
        alt={result.name}
        className="w-16 h-16 object-cover "
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};

const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);

  const { title, storyline, director, writers, cast } = movieInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;

    for (let writer of writers) {
      if (writer.id === profile.id) {
        return toast.error("Writer Already Selected");
      }
    }

    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const handleWriterRemove = (profileID) => {
    const { writers } = movieInfo;

    const newWriters = writers.filter(({ id }) => id !== profileID);

    if (!newWriters.length) {
      hideWritersModal();
    }
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const handleCastRemove = (profileID) => {
    const { cast } = movieInfo;

    const newCast = cast.filter(({ profile }) => profile.id !== profileID);

    if (!newCast.length) {
      hideCastModal();
    }
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const hideWritersModal = () => {
    setShowWritersModal(false);
  };

  const displayWritersModal = () => {
    setShowWritersModal(true);
  };

  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const displayCastModal = () => {
    setShowCastModal(true);
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" flex space-x-3">
        <div className="w-[70%] space-y-5 ">
          {/* title */}
          <div>
            <Label htmlFor={"title"}>Title</Label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Movie Name"
              className={` ${commonInputClasses}  font-semibold text-xl `}
              value={title}
              onChange={handleChange}
            />
          </div>

          {/* storyline */}
          <div>
            <Label htmlFor={"Storyline"}>Storyline</Label>
            <textarea
              name="storyline"
              value={storyline}
              onChange={handleChange}
              id="storyline"
              placeholder="Enter Storyline"
              className={`${commonInputClasses} resize-none h-24  border-b-2 `}
            />
          </div>

          {/* tags */}
          <div>
            <Label htmlFor={"tags"}>Tags</Label>
            <TagsInput name="tags" onChange={updateTags} />
          </div>

          {/* director */}
          <div>
            <Label htmlFor={"director"}>Director</Label>
            <LiveSearch
              name={"director"}
              placeholder="Search Profile"
              onSelect={updateDirector}
              results={results}
              renderItem={renderItem}
              value={director.name}
            />
          </div>

          {/* writers */}
          <div>
            <div className=" flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor={"writers"}>
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                visible={writers.length}
                onClick={displayWritersModal}
              >
                View All
              </ViewAllBtn>
            </div>
            <LiveSearch
              name={"writers"}
              placeholder="Search Profile"
              onSelect={updateWriters}
              results={results}
              renderItem={renderItem}
            />
          </div>

          {/* cast */}
          <div className="relative">
            <div className=" flex justify-between">
              <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn visible={cast.length} onClick={displayCastModal}>
                View All
              </ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>
          <Submit value={"Upload"} />
        </div>

        <div className="w-[30%] "></div>
      </form>
      <WritersModal
        profiles={writers}
        visible={showWritersModal}
        onClose={hideWritersModal}
        onRemoveClick={handleWriterRemove}
      />
      <CastModal
        cast={cast}
        visible={showCastModal}
        onClose={hideCastModal}
        onRemoveClick={handleCastRemove}
      />
    </>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className=" dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) {
      return null;
    }

    return (
      <span className="dark:bg-dark-subtle bg-light-subtle absolute top-0 right-0 translate-x-[1.3rem] -translate-y-[0.2rem] w-5 h-5 rounded-full flex items-center justify-center text-white text-[0.7rem]">
        {badge <= 9 ? badge : `9+`}
      </span>
    );
  };

  return (
    <div className=" relative">
      <Label htmlFor={htmlFor}>{children}</Label>

      {renderBadge()}
    </div>
  );
};

const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) {
    return null;
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};

export default MovieForm;
