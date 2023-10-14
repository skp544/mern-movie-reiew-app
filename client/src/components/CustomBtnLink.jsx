const CustomBtnLink = ({ label, clickable = true, onClick }) => {
  const classes = clickable ? "hover:underline " : " cursor-default";

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${classes} text-highlight dark:text-highlight-dark `}
    >
      {label}
    </button>
  );
};

export default CustomBtnLink;
