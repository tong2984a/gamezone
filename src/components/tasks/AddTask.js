import { React, useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import Modal from './Modal';
import './addTask.css';
import { db } from './firebase';

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [rules, setRules] = useState([]);

  /* function to get all rules from firestore in realtime */
  useEffect(() => {
    const ruleColRef = query(collection(db, 'rules'), orderBy('created', 'desc'));
    onSnapshot(ruleColRef, (snapshot) => {
      setRules(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
        title: doc.data().title,
        upperLimit: doc.data().upperLimit,
        lowerLimit: doc.data().lowerLimit,
        winners: doc.data().winners,
        description: doc.data().description,
      })));
    });
  }, []);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'gamings'), {
        author: '新直播主',
        avatar: '/images/avatar/ugonzo.jpg',
        badge: 'Total Payout: 20 ETH',
        edition: 1,
        imageUrl: '/images/club/blankos.png',
        likes: 300,
        price,
        stock: 200,
        title,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      console.error(err);
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
        <input
          type="text"
          name="price"
          onChange={(e) => setPrice(e.target.value.toUpperCase())}
          value={price}
          placeholder="Enter price (ETH)"
        />
        <p>What is your favorite color?</p>
        <br />
        <select id="rules">
          {rules.map((rule) => (
            <option value={rule.title}>{rule.title} {rule.description}</option>
          ))}
        </select>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
