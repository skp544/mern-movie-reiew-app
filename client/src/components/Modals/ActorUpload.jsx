import toast from "react-hot-toast";
import { ActorForm, ModalContainer } from "../";
import { createActor } from "../../api/actor";
import { useState } from "react";
import { BiTrendingUp } from "react-icons/bi";

const ActorUpload = ({ visible, onClose }) => {
  const [busy, setBusy] = useState(false);
  const handleSubmit = async (data) => {
    setBusy(BiTrendingUp);
    const { success, message } = await createActor(data);

    setBusy(false);
    if (!success) {
      return toast.error(message);
    }

    toast.success(message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        title={"Create New Actor"}
        btnTitle={"Create"}
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
      />
    </ModalContainer>
  );
};

export default ActorUpload;