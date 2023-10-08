import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Actors = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 my-5">
      <ActorProfile
        profile={{
          name: "John doe",
          about:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore error beatae quaerat nostrum harum aspernatur. Id iste obcaecati vitae harum. Id autem similique hic ad aliquam nam ex perferendis sequi!",
          avatar:
            "https://plus.unsplash.com/premium_photo-1695755054497-54fe299c0654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        }}
      />

      <ActorProfile
        profile={{
          name: "John doe",
          about:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore error beatae quaerat nostrum harum aspernatur. Id iste obcaecati vitae harum. Id autem similique hic ad aliquam nam ex perferendis sequi!",
          avatar:
            "https://plus.unsplash.com/premium_photo-1695755054497-54fe299c0654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        }}
      />
      <ActorProfile
        profile={{
          name: "John doe",
          about:
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore error beatae quaerat nostrum harum aspernatur. Id iste obcaecati vitae harum. Id autem similique hic ad aliquam nam ex perferendis sequi!",
          avatar:
            "https://plus.unsplash.com/premium_photo-1695755054497-54fe299c0654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        }}
      />
    </div>
  );
};

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };
  const handleOnMouseLeave = () => {
    setShowOptions(false);
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
          <h2 className=" text-xl text-primary dark:text-white font-semibold">
            {name}
          </h2>
          <p className="text-primary dark:text-white">
            {about.substring(0, 50)}
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
        className=" p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
        onClick={onDeleteClick}
      >
        <BsTrash />
      </button>
      <button
        className=" p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare onClick={OnEditClick} />
      </button>
    </div>
  );
};

export default Actors;
