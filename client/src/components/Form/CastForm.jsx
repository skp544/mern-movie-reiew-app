import { useState } from "react";
import LiveSearch from "./LiveSearch";
import { commonInputClasses } from "../../utils/theme";
import { results } from "../../utils/fakeData";
import { renderItem } from "../Admin/MovieForm";
import toast from "react-hot-toast";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });

  const { leadActor, profile, roleAs } = castInfo;

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === leadActor) {
      return setCastInfo({ ...castInfo, leadActor });
    }

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;

    if (!profile.name) {
      return toast.error("Cast Profile is Missing!");
    }

    if (!roleAs.trim()) {
      return toast.error("Cast Role is Missing!");
    }

    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo });
  };

  return (
    <div className=" flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        id="leadActor"
        className=" w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
        title="Set As Lead Actor"
      />
      <LiveSearch
        placeholder="Search Profile"
        value={profile.name}
        results={results}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className=" flex-grow">
        <input
          type="text"
          className={`${commonInputClasses} rounded py-1 px-2 text-lg border-2`}
          placeholder="Role As"
          name="roleAs"
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-secondary dark:bg-white dark:text-primary py-1 px-2 rounded-md hover:opacity-90 transition"
      >
        Add
      </button>
    </div>
  );
};

export default CastForm;
