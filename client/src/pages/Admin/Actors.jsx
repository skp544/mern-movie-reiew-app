import { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../api/actor";

import { toast } from "react-hot-toast";
import { NextAndPrevButton } from "../../components";

let currentPageNo = 0;
const limit = 20;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  // const [currentPageNo, setCurrentPageNo] = useState(0);

  const fetchActors = async (pageNo) => {
    const { profiles, success, message } = await getActors(pageNo, limit);

    if (!success) {
      return toast.error(message);
    }

    if (!profiles.length) {
      // setCurrentPageNo(pageNo - 1);
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setActors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) {
      toast.error("No More actors!");
      return;
    }

    // setCurrentPageNo((prev) => prev + 1);
    currentPageNo += 1;
    fetchActors(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) {
      currentPageNo = 0;
      setReachedToEnd(false);
      toast.error("You are on first page!");
      return;
    }
    setReachedToEnd(false);
    currentPageNo -= 1;

    fetchActors(currentPageNo);
  };

  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);

  return (
    <div className=" p-5">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
        {actors.map((actor) => {
          return <ActorProfile key={actor.id} profile={actor} />;
        })}
      </div>
      <NextAndPrevButton
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
        className=" mt-8"
      />
    </div>
  );
};

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };
  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptedNameLength) {
      return name;
    }

    return name.substring(0, acceptedNameLength) + "...";
  };

  if (!profile) return null;

  const { name, avatar, about = "" } = profile;
  return (
    <div className=" bg-white dark:bg-secondary shadow dark:shadow rounded h-20 overflow-hidden ">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className=" flex  cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className=" w-20  aspect-square rounded-sm object-cover"
        />

        <div className=" px-2">
          <h2 className=" text-xl text-primary dark:text-white font-semibold whitespace-nowrap mb-1">
            {getName(name)}
          </h2>
          <p className="text-primary dark:text-white text-sm">
            {about.substring(0, 40) + " ..."}
          </p>
        </div>

        <Options visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, OnEditClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className=" absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm  flex items-center justify-center space-x-4">
      <button
        className=" p-2 rounded-full bg-white text-primary hover:opacity-80  hover:bg-red-500 hover:text-white transition-all duration-200"
        type="button"
        onClick={onDeleteClick}
      >
        <BsTrash />
      </button>
      <button
        className=" p-2 rounded-full bg-white text-primary hover:opacity-80 hover:bg-orange-600 hover:text-white transition-all duration-200"
        type="button"
      >
        <BsPencilSquare onClick={OnEditClick} />
      </button>
    </div>
  );
};

export default Actors;
