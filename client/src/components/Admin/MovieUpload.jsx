import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadTrailer } from "../../api/movie";
import { useState } from "react";
import { ModalContainer, MovieForm } from "../";

const MovieUpload = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    storyline: "",
    cast: [],
    tags: [],
    director: {},
    writer: [],
    releaseDate: "",
    poster: null,
    genres: [],
    type: "",
    language: "",
    status: "",
    trailer: {
      url: "",
      public_id: "",
    },
  });

  const [videoInfo, setVideoInfo] = useState({});

  const handleUploadTrailer = async (formData) => {
    const { success, message, response } = await uploadTrailer(
      formData,
      setUploadProgress
    );

    if (!success) {
      return toast.error(message);
    }

    const { url, public_id } = response;

    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
    toast.success(message);
  };

  const handleTypeError = (error) => {
    toast.error(error);
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Upload progress ${uploadProgress}`;
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      {/* <UploadProgress
          width={uploadProgress}
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
        />

        <TrailerSelector
          visible={!videoSelected}
          handleChange={handleChange}
          OnTypeError={handleTypeError}
        /> */}

      <MovieForm />
    </ModalContainer>
  );
};

const TrailerSelector = ({ visible, handleChange, OnTypeError }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={["mp4", "avi", "mkv"]}
        onTypeError={OnTypeError}
      >
        <div className=" w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col text-secondary dark:text-dark-subtle justify-center items-center cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p className="">Drop your file here</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className=" dark:bg-secondary bg-white drop-shadow-lg rounded p-3 overflow-hidden">
      <div className=" h-3 relative dark:bg-dark-subtle bg-light-subtle ">
        <div
          style={{ width: width + "%" }}
          className="h-full absoulute bg-secondary dark:bg-white left-0"
        />
      </div>
      <p className="text-center font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-2">
        {message}
      </p>
    </div>
  );
};

export default MovieUpload;
