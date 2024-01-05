import Modal from "react-native-modal";

import styles from "./custommodal.styles";

const CustomModal = ({
  children,
  modalVisible,
  toggleModal,
}: {
  modalVisible: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      style={styles.modalContainer}
      onBackdropPress={toggleModal}
      backdropColor="rgba(0,0,0,.5)"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
