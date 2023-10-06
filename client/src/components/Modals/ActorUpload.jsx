import { ActorForm, ModalContainer } from "../";

const ActorUpload = ({ visible, onClose }) => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        title={"Create New Actor"}
        btnTitle={"Create"}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
};

export default ActorUpload;
