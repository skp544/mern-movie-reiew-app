import { useState } from "react";
import toast from "react-hot-toast";

import {
  CastForm,
  CastModal,
  GenresModal,
  GenresSelector,
  LiveSearch,
  PosterSelector,
  Selector,
  Submit,
  TagsInput,
  WritersModal,
} from "../";

// import { results } from "../../utils/fakeData";
import { commonInputClasses } from "../../utils/theme";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import { useSearch } from "../../hooks";
import { searchActor } from "../../api/actor";

const defaultMovieInfo = {
  title: "",
  storyline: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
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
  // states
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [writerName, setWriterName] = useState("");
  const [writersProfile, setWritersProfile] = useState([]);
  const [directorProfile, setDirectorProfile] = useState([]);

  // live search hook
  const { handleSearch, searching, results, resetSearch } = useSearch();

  const {
    title,
    storyline,
    director,
    writers,
    cast,
    tags,
    genres,
    type,
    language,
    status,
  } = movieInfo;

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  // creating url for poster
  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  // handle change function handle all the changes in form
  const handleChange = ({ target }) => {
    const { value, name, files } = target;

    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }

    setMovieInfo({ ...movieInfo, [name]: value });
  };

  // tag update function
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  // director update function
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
    resetSearch();
  };

  // updating writers function
  const updateWriters = (profile) => {
    const { writers } = movieInfo;

    for (let writer of writers) {
      if (writer.id === profile.id) {
        return toast.error("Writer Already Selected");
      }
    }

    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
    setWriterName("");
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

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };

  const handleProfileChange = ({ target }) => {
    const { name, value } = target;
    if (name === "director") {
      setMovieInfo({ ...movieInfo, director: { name: value } });
      handleSearch(searchActor, value, setDirectorProfile);
    }
    if (name === "writers") {
      setWriterName(value);
      handleSearch(searchActor, value, setWritersProfile);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl mt-2 mb-4 dark:text-white text-primary font-semibold">
        Movie Form
      </h1>
      <div className=" flex space-x-3">
        {/* right  */}
        <div className="w-[70%] space-y-5 ">
          {/* title */}
          <div className=" flex-col-1">
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
          <div className=" flex-col-1">
            <Label htmlFor={"Storyline"}>Storyline</Label>
            <textarea
              name="storyline"
              value={storyline}
              onChange={handleChange}
              id="storyline"
              placeholder="Enter Storyline"
              className={`${commonInputClasses} resize-none h-24  border-b-2 custom-scroll-bar `}
            />
          </div>

          {/* tags */}
          <div className=" flex-col-1">
            <Label htmlFor={"tags"}>Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>

          {/* director */}
          <div className=" flex-col-1">
            <Label htmlFor={"director"}>Director</Label>
            <LiveSearch
              name={"director"}
              placeholder="Search Profile"
              onSelect={updateDirector}
              results={directorProfile}
              renderItem={renderItem}
              value={director?.name}
              onChange={handleProfileChange}
              visible={directorProfile.length}
            />
          </div>

          {/* writers */}
          <div className=" flex-col-1">
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
              name="writers"
              results={writersProfile}
              placeholder="Search profile"
              renderItem={renderItem}
              onSelect={updateWriters}
              onChange={handleProfileChange}
              value={writerName}
              visible={writersProfile.length}
            />
          </div>

          {/* cast */}
          <div className=" flex-col-1">
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

          {/* date */}

          <div className="flex flex-col gap-1">
            <Label htmlFor={"releaseDate"}>Release Date</Label>
            <input
              type="date"
              id="releaseDate"
              className={`${commonInputClasses} border-2 rounded p-1 w-max`}
              onChange={handleChange}
              name="releaseDate"
            />
          </div>
          <Submit value={"Upload"} onClick={handleSubmit} type={"button"} />
        </div>

        {/* left */}
        <div className="w-[30%]  space-y-5 ">
          {/* poster */}
          <PosterSelector
            name={"poster"}
            selectedPoster={selectedPosterForUI}
            onChange={handleChange}
            label={"Select Poster"}
            accept="image/*"
          />

          {/* genres */}
          <GenresSelector onClick={displayGenresModal} badge={genres.length} />

          {/* movie type */}
          <Selector
            onChange={handleChange}
            options={typeOptions}
            label={"Type"}
            name={"type"}
            value={type}
          />

          {/* movie language */}
          <Selector
            onChange={handleChange}
            name={"language"}
            options={languageOptions}
            label={"Language"}
            value={language}
          />

          {/* movie status */}
          <Selector
            onChange={handleChange}
            options={statusOptions}
            label={"Status"}
            name={"status"}
            value={status}
          />
        </div>
      </div>

      {/* Modals */}
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

      <GenresModal
        onSubmit={updateGenres}
        visible={showGenresModal}
        onClose={hideGenresModal}
        previousSelection={genres}
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
