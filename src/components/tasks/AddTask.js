import { React, useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import Modal from './Modal';
import './addTask.css';
import { db } from './firebase';

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState('Splatoon3');
  const [price, setPrice] = useState('');
  const [rule, setRule] = useState('');
  const [stock, setStock] = useState(8);
  const [rules, setRules] = useState([]);
  const titles = [{
    id: 1,
    title: 'Splatoon3',
    description: '',
  }];
  const stocks = [2, 3, 4, 5, 6, 7, 8];

  /* function to get all rules from firestore in realtime */
  useEffect(() => {
    const ruleColRef = query(collection(db, 'rules'), orderBy('title', 'asc'));
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
        imageUrl: '/images/club/splatoon3.jpg',
        likes: 300,
        price,
        stock,
        rule,
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
        <select
          id="titles"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        >
          {titles.map((titleOption) => (
            <option key={titleOption.id} value={titleOption.title}>{titleOption.title} {titleOption.description}</option>
          ))}
        </select>
        <br />
        <input
          type="text"
          name="price"
          onChange={(e) => setPrice(e.target.value.toUpperCase())}
          value={price}
          placeholder="Enter 入場費 (ETH)"
        />
        <br />
        <label htmlFor="stocks"><span>上限人數 </span>
          <select
            id="stocks"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
          >
            {stocks.map((stockOption) => (
              <option key={stockOption} value={stockOption}>{stockOption}</option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="rules"><span>規矩 </span>
          <select
            id="rules"
            onChange={(e) => setRule(e.target.value)}
            value={rule}
          >
            {rules.map((ruleOption) => (
              <option key={ruleOption.id} value={ruleOption.title}>{ruleOption.title} {ruleOption.description}</option>
            ))}
          </select>
        </label>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
