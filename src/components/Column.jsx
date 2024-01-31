import "./Column.css";
import React, { useEffect, useMemo, useState } from "react";
import Task from "./task";
import { useTaskStore } from "../store";
import { shallow } from "zustand/shallow";
import classNames from "classnames";
function Column({ state }) {
  const tasks = useTaskStore(
    (store) => store.tasks.filter((element) => element.state === state),
    shallow
  );

  // const tasks = useTaskStore((store) => store.tasks);

  // const filtered = useMemo(
  //   () => tasks.filter((task) => task.state === state),
  //   [tasks, state]
  // );

  const addTask = useTaskStore((store) => store.addTask);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [drop, setDrop] = useState(false);
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask);
  const draggedTask = useTaskStore((store) => store.draggedTask);
  const moveTask = useTaskStore((store) => store.moveTask);
  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
        console.log(e);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button className="" onClick={() => setVisible(!visible)}>
          Add
        </button>
      </div>
      {tasks.map((task) => {
        return <Task key={task.title} title={task.title} />;
      })}
      {visible ? (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setVisible(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Column;
