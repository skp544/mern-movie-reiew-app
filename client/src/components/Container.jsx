const Container = ({ children, className }) => {
  return (
    <div
      className={` max-w-screen-xl mx-auto ${className} px-2 xl:px-0 w-full `}
    >
      {children}
    </div>
  );
};

export default Container;
