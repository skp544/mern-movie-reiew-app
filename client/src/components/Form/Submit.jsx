const Submit = ({ value, className }) => {
  return (
    <input
      type="submit"
      className={`w-full rounded-lg dark:bg-white bg-secondary hover:bg-opacity-90 transition-all duration-200 font-semibold text-lg dark:text-secondary text-white py-2 px-4 cursor-pointer  focus:outline-none ${className}`}
      value={value}
    />
  );
};

export default Submit;
