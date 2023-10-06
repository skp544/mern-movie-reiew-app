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
