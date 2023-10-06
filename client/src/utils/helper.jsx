export const getToken = () => localStorage.getItem("auth-token");

export const isValidEmail = (email) => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return isValid.test(email);
};

export const validateActor = ({ name, about, gender, avatar }) => {
  if (!name.trim()) {
    return { error: "Actor Name is missing!" };
  }
  if (!about.trim()) {
    return { error: "About section is empty!" };
  }
  if (!gender.trim()) {
    return { error: "Gender is missing!" };
  }

  if (avatar && !avatar.type?.startsWith("image")) {
    return { error: "Invalid image or / avatar file!" };
  }

  return { error: null };
};

export const catchError = (error) => {
  const { response } = error;

  if (response?.data) {
    return response?.data;
  }

  return { error: error.message || error };
};

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
      <img
        src={result.avatar}
        alt={result.name}
        className="w-16 h-16 object-cover "
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};
