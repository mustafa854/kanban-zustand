import React, { useEffect } from "react";
import "./Task.css";
import classNames from "classnames";
import { useTaskStore } from "../store";
import trash from "../assets/trash-2.svg";
function Task({ title }) {
  const task = useTaskStore((store) =>
    store.tasks.find((element) => element.title === title)
  );

  const deleteTask = useTaskStore((store) => store.deleteTask);
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask);
  return (
    <>
      <div
        className="task"
        draggable
        onDragStart={() => setDraggedTask(task.title)}
      >
        {task.title}
        <div className="bottomWrapper">
          <div>
            <img src={trash} onClick={() => deleteTask(title)} alt="" />
          </div>
          <div className={classNames("status", task.state)}>{task.state}</div>
        </div>
      </div>
    </>
  );
}

export default Task;
