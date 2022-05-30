import React, { useState } from "react";
import "../styles/AddTask.css";
import Button from "./Button";
import Input from "./Input";

const AddTask = ({ postTasks, getTasks,deleteCheckTasks, deleteUncheckTasks, deleteAllTasks }) => {
  const [task, setTask] = useState("");

  const addNewPost = () => {
    const newPost = {
      name: task,
      done: false,
    };

    if (task.trim()) {
      postTasks(newPost).then(() => getTasks());
    }
    setTask("");
  };

  const clearAll = () => {
    deleteAllTasks();
  };

  const clearDone = () => {
    deleteCheckTasks()
  };

  const clearUndone = () => {
    deleteUncheckTasks()
  };

  const getValue = (e) => {
    setTask(e.target.value);
  };

  const addEnter = (e) => {
    if (e.code === "Enter") {
      addNewPost();
    }
  };

  return (
    <div className="add__task">
      <Input
        type={"text"}
        placeholder={"I want to..."}
        classStyle={"inp"}
        value={task}
        callback={getValue}
        addEnter={addEnter}
      />
      <Button body={"Add"} callback={addNewPost} />
      <Button body={"Clear All"} callback={clearAll} />
      <Button body={"Clear done"} callback={clearDone} />
      <Button body={"Clear undone"} callback={clearUndone} />
    </div>
  );
};

export default AddTask;