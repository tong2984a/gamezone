import './task.css';
import { React, useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import TaskItem from './TaskItem';
import EditTask from './EditTask';

function Task({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, 'tasks', id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'tasks', id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div
        role="button"
        onClick={() => setChecked(!checked)}
        onKeyPress={() => setChecked(!checked)}
        tabIndex="0"
      >
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
        >
          <input
            id={`checkbox-${id}`}
            className="checkbox-custom"
            name="checkbox"
            checked={checked}
            onChange={handleChange}
            type="checkbox"
          />
        </label>
      </div>
      <div className="task__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <button
              type="button"
              className="task__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button
              type="button"
              className="task__deleteButton"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <button
            type="button"
            onClick={() => setOpen({ ...open, view: true })}
          >
            View
          </button>
        </div>
      </div>

      {open.view
        && (
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
        )}

      {open.edit
        && (
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
        )}

    </div>
  );
}

export default Task;
