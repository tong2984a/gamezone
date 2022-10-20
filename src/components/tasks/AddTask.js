import { React, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Modal from './Modal';
import './addTask.css';
import { db } from './firebase';

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        completed: false,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
        />
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
