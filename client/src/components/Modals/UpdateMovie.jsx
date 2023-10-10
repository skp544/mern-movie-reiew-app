import { useState } from "react";
import { ModalContainer, MovieForm } from "../";
import { updateMovie } from "../../api/movie";
import toast from "react-hot-toast";

const UpdateMovie = ({ visible, initialState, onSuccess, onClose }) => {
  const [busy, setBusy] = useState();

  const handleSubmit = async (data) => {
    setBusy(true);

    const { success, message, movie } = await updateMovie(
      initialState.id,
      data
    );

    setBusy(false);

    if (!success) {
      return toast.error(message);
    }

    toast.success(message);

    setBusy(false);
    onSuccess(movie);

    onClose();
  };
  return (
    <ModalContainer visible={visible}>
      <MovieForm
        initialState={initialState}
        btnTitle={"Update"}
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
      />
    </ModalContainer>
  );
};

export default UpdateMovie;
