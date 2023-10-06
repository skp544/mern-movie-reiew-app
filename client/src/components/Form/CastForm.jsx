import { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import toast from "react-hot-toast";
import { renderItem } from "../../utils/helper";
import { useSearch } from "../../hooks";

import LiveSearch from "./LiveSearch";
import { searchActor } from "../../api/actor";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);

  const { leadActor, profile, roleAs } = castInfo;

  const { handleSearch, resetSearch } = useSearch();

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === leadActor) {
      return setCastInfo({ ...castInfo, leadActor: checked });
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
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });

    resetSearch();
    setProfiles([]);
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;

    const { profile } = castInfo;

    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });

    handleSearch(searchActor, value, setProfiles);
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
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
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
