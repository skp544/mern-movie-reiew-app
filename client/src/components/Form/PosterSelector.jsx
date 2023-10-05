import { commonPosterUi } from "../../utils/theme";

const PosterSelector = ({ name, selectedPoster, onChange, accept }) => {
  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        type="file"
        name={name}
        id={name}
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            className={`${commonPosterUi} object-cover`}
            alt="poster"
            onChange={onChange}
          />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

const PosterUI = () => {
  return (
    <div className={`${commonPosterUi}`}>
      <span className=" dark:text-dark-subtle text-light-subtle">
        Select Poster
      </span>
    </div>
  );
};

export default PosterSelector;
