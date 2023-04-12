import './taskManager.css';
import { React, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { db } from './firebase';
import AddTask from './AddTask';
import AddRule from './AddRule';
import Grid from '../styled/Grid.styled';
import NFTCard from '../styled/NFTCard.styled';
import { Colors } from '../Theme';

const Sort = styled.div`
  border-radius: 30px;
  border: 1px solid ${Colors.Primary};
  padding: 0.4rem 2.5rem;
  width: 168px;
  cursor: pointer;
`;
const Date = styled.div`
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  border-radius: 30px;
  padding: 0.4rem 2.5rem;
  width: 168px;
  cursor: pointer;
`;

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
        <Grid>
          {tasks.map((task) => (
            <NavLink key={task.id} to={`/match/${task.title || task.id}/${task.stock}`} className="navlink">
              <NFTCard item={task} />
            </NavLink>
          ))}
        </Grid>
      </div>
      <br />
      <Sort onClick={() => setOpenAddModal(true)}>
        Add 比賽 +
      </Sort>
      <br />
      <Date onClick={() => setOpenAddRuleModal(true)}>
        Add 規矩 +
      </Date>

      <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />

      <AddRule onClose={() => setOpenAddRuleModal(false)} open={openAddRuleModal} />
    </div>
  );
}

export default TaskManager;
