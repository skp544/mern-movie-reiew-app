import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SearchForm = ({ placeholder, onSubmit, showResetIcon, onReset }) => {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    onSubmit(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className=" border-2 dark:border-dark-subtle border-light-subtle dark:border-white focus:border-primary transition-all bg-transparent rounded text-lg py-2 px-4 outline-none dark:text-white"
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      {showResetIcon && (
        <button
          onClick={handleReset}
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
          type="button"
        >
          <AiOutlineClose className="" />
        </button>
      )}
    </form>
  );
};

export default SearchForm;
