import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../hooks";

const Header = ({ onAddMovieClick, onAddActorClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  const options = [
    {
      title: "Add Movie",
      onClick: onAddMovieClick,
    },
    {
      title: "Add Actor",
      onClick: onAddActorClick,
    },
  ];

  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        className=" border-2 dark:border-dark-subtle border-light-subtle dark:border-white focus:border-primary transition-all bg-transparent rounded text-lg py-2 px-4 outline-none dark:text-white"
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="  dark:text-white text-light-subtle "
        >
          <BsFillSunFill size={24} className="" />
        </button>
        <button
          onClick={() => setShowOptions(true)}
          className="flex gap-2 items-center dark:border-dark-subtle border-light-subtle   dark:text-dark-subtle text-light-subtle hover:opacity-80 transition-all duration-200 font-semibold border-2 rounded-lg text-lg py-2 px-4"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
      </div>

      <CreateOptions
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        options={options}
      />
    </div>
  );
};

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "option-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      id={containerID}
      ref={container}
      className={`absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary  bg-white drop-shadow-lg rounded-md animate-scale`}
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) {
          onClose();
        }
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option onClick={onClick} key={title}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className=" dark:text-white text-secondary hover:opacity-80 transition-all duration-200"
    >
      {children}
    </button>
  );
};

export default Header;