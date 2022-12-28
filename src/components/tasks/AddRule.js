import { React, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Modal from './Modal';
import './addRule.css';
import { db } from './firebase';

function AddRule({ onClose, open }) {
  const [title, setTitle] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [winners, setWinners] = useState('');
  const [description, setDescription] = useState('');

  /* function to add new rule to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rules'), {
        author: '新直播主',
        avatar: '/images/avatar/ugonzo.jpg',
        badge: 'Total Payout: -',
        edition: 1,
        imageUrl: '/images/club/blankos.png',
        likes: 300,
        stock: 200,
        title,
        description,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal modalLable="Add Rule" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addRule" name="addRule">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter 規矩名稱"
        />
        <input
          type="text"
          name="upperLimit"
          onChange={(e) => setUpperLimit(e.target.value.toUpperCase())}
          value={upperLimit}
          placeholder="上限人數"
        />
        <input
          type="text"
          name="lowerLimit"
          onChange={(e) => setLowerLimit(e.target.value.toUpperCase())}
          value={lowerLimit}
          placeholder="下限人數"
        />
        <input
          type="text"
          name="winners"
          onChange={(e) => setWinners(e.target.value.toUpperCase())}
          value={winners}
          placeholder="獲獎人數"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter 詳細內容"
          value={description}
        />
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddRule;
