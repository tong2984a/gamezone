import './taskManager.css';
import { React, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { db } from './firebase';
import AddTask from './AddTask';
import AddRule from './AddRule';
import Grid from '../styled/Grid.styled';
import NFTCard from '../styled/NFTCard.styled';

function TaskManager() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAddRuleModal, setOpenAddRuleModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, 'gamings'), orderBy('created', 'desc'));
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
        title: doc.data().title,
        imageUrl: doc.data().imageUrl,
        edition: doc.data().edition,
        stock: doc.data().stock,
        badge: doc.data().badge,
        price: doc.data().price,
        avatar: doc.data().avatar,
        author: doc.data().author,
        likes: doc.data().likes,
        players: doc.data().players ?? [],
      })));
    });
  }, []);

  return (
    <div className="taskManager">
      <div className="taskManager__container">
        <div>
          <button
            type="button"
            onClick={() => setOpenAddModal(true)}
          >
            Add Game +
          </button>
          <button
            type="button"
            onClick={() => setOpenAddRuleModal(true)}
          >
            Add 規矩 +
          </button>
        </div>
        <Grid>
          {tasks.map((task) => (
            <NavLink key={task.id} to={`/match/${task.title}`} className="navlink">
              <NFTCard item={task} />
            </NavLink>
          ))}
        </Grid>
      </div>

      {openAddModal
      && (
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}

      {openAddRuleModal
      && (
        <AddRule onClose={() => setOpenAddRuleModal(false)} open={openAddRuleModal} />
      )}
    </div>
  );
}

export default TaskManager;
