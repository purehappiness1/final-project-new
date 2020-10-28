import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/actions";
import Button from "@material-ui/core/Button";

const Modal = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ isOpen: false, inputValue: "" });
  const { inputValue } = state;

  const openModal = async () => {
    setState({ isOpen: true });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((currentState) => {
      return { ...currentState, [name]: value };
    });
  };

  const submitHandler = () => {
    dispatch(addTask(inputValue));
  };

  return (
    <React.Fragment>
      <Button onClick={openModal} disableElevation color="primary" variant="contained" style={styles3.btn}>New board</Button>
      <Button onClick={openModal} disableElevation color="primary" variant="contained" style={styles3.btn}>New task</Button>
      {state.isOpen && (
        <div style={styles.modal}>
          <div style={styles1.modalBody}>                                     
            <h1>Заполните поля</h1>
            <textarea
            style={styles3.textarea}
              placeholder="Краткое описание"
              onChange={onChangeHandler}
              name="inputValue"
              value={state.inputValue}
            />
            <br />
            <Button
            color="primary" variant="contained" style={styles3.btn}
              onClick={() => {
                submitHandler();
                setState({ isOpen: false });}}>Добавить(закрыть окно)</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    paddingTop: "5rem",
    zIndex: 1,
  },
};

const styles1 = {
  modalBody: {
    padding: "2rem",
    width: "400px",
    borderRadius: "12px",
    background: "#fff",
    height: "450px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
};

const styles3 = {
    btn: {
      margin: '5px',
      border: '1px solid black'
    },
    textarea: {
      width: "300px",
      height: '100px',
      margin: '20px 0 20px 0',
      borderRadius: '5px',
    },
}

export default Modal;
