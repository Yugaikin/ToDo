import Button from "./Button";
import "../styles/ModalWindow.css";

const ModalWindow = ({
  modalValue,
  setModalValue,
  visible,
  setVisible,
  post,
  setPosts,
  patchChangeTask,
}) => {
  const rootClasses = ["modal-window"];

  visible && rootClasses.push("active");

  const saveTask = (e, uuid) => {
    setPosts((prev) =>
      prev.map((el) =>
        el.uuid === post.uuid ? { ...el, name: modalValue } : el
      )
    );
    setVisible(false);
    patchChangeTask(modalValue, uuid);
  };

  const closeEditing = () => {
    setVisible(false);
  };

  return (
    <div className={rootClasses.join(" ")}>
      <div className="modal-content">
        <textarea
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
        <Button
          body={"Save"}
          callback={(e) => saveTask(modalValue, post.uuid)}
        />
        <Button body={"Close"} callback={closeEditing} />
      </div>
    </div>
  );
};

export default ModalWindow;