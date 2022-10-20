import './taskManager.css';
import { React, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { db } from './firebase';
import AddTask from './AddTask';
import Grid from '../styled/Grid.styled';
import NFTCard from '../styled/NFTCard.styled';

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'desc'));
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
        Title: doc.data().Title,
        ImageUrl: doc.data().ImageUrl,
        Edition: doc.data().Edition,
        Stock: doc.data().Stock,
        Badge: doc.data().Badge,
        Price: doc.data().Price,
        Avatar: doc.data().Avatar,
        Author: doc.data().Author,
        Likes: doc.data().Likes,
        players: doc.data().players ?? [],
      })));
    });
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <button
          type="button"
          onClick={() => setOpenAddModal(true)}
        >
          Add Game +
        </button>
        <Grid>
          {tasks.map((task) => (
            <NavLink key={task.id} to="/asset" className="navlink" state={{ task }}>
              <NFTCard item={task} />
            </NavLink>
          ))}
        </Grid>
      </div>

      {openAddModal
      && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}

    </div>
  );
}

export default TaskManager;
