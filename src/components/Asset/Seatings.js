import { ethers } from 'ethers';
import { React, useState, useEffect } from 'react';
import { doc, arrayUnion, updateDoc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../tasks/firebase';
import './Seatings.css';

import { deployed } from '../../config';
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json';

const envChainName = deployed.envChain.name;
const envChainId = deployed.envChain.id;
const { nftmarketaddress, nftaddress } = deployed;

export default function Seatings({ title }) {
  const [task, setTask] = useState();
  const [players, setPlayers] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, 'gamings'), where('title', '==', title));
    onSnapshot(taskColRef, (snapshot) => {
      snapshot.forEach((doc1) => {
        setTask({
          id: doc1.id,
          data: doc1.data(),
          title: doc1.data().title,
          imageUrl: doc1.data().imageUrl,
          edition: doc1.data().edition,
          stock: doc1.data().stock,
          badge: doc1.data().badge,
          price: doc1.data().price,
          avatar: doc1.data().avatar,
          author: doc1.data().author,
          likes: doc1.data().likes,
        });
        setPlayers(doc1.data().players ?? []);
      });
    });
  }, []);

  const placeBid = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const market = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    const price = ethers.utils.parseUnits('0.01', 'ether');
    try {
      const transaction = await market.createMarketSale(nftaddress, 2, { value: price });
      await transaction.wait();
    } catch (error) {
      if (error.code === -32603) {
        console.error({ title: 'Error - Please check your wallet and try again.', message: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
      } else {
        console.error({ title: 'Error - Please check your wallet and try again.', message: error.message });
      }
    }
  };

  async function ethAccountsRequest() {
    if (window.ethereum) {
      const result = await Promise.all([
        window.ethereum.request({ method: 'eth_requestAccounts' }),
        window.ethereum.request({ method: 'eth_chainId' }),
      ]).catch((error) => {
        if (error.code === 4001) {
          throw new Error('Please check your wallet and try again', { message: 'Connection request has been rejected. ' });
        } else if (error.code === -32002) {
          throw new Error('Please check your wallet and try again', { message: error.message });
        } else {
          throw new Error('Please check your wallet and try again', { message: error.message });
        }
      });
      if (result) {
        const [accounts, chainId] = result;
        console.log('error1', result, envChainId);
        if (accounts.length === 0) {
          throw new Error('Please check your wallet and try again', { message: 'MetaMask is locked or the user has not connected any accounts' });
        }
        if (chainId !== envChainId) {
          throw new Error('Please check your wallet and try again', { message: `Error - Is your wallet connected to ${envChainName}?` });
        }
        return accounts[0];
      }
    }
    throw new Error('Non-Ethereum browser detected.', { message: 'You should consider installing MetaMask' });
  }

  /* function to update firestore */
  const handleChange = async (player) => {
    const account = await ethAccountsRequest();
    placeBid();

    const taskDocRef = doc(db, 'gamings', task.id);
    try {
      await updateDoc(taskDocRef, {
        players: arrayUnion(player),
        seats: arrayUnion({ account, player }),
      });
      setPlayers([...players, player]);
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  return (
    <div className="theatre">
      <div className="screen-side">
        <h3 className="select-text">Please select your seat</h3>
      </div>
      <ol className="cabin">
        {
          Array.from({ length: 10 }, (_rowElement, row) => (
            <li key={row} className={`row row--${row + 1}`}>
              <ol className="seats" type="A">
                {Array.from(['A', 'B', 'C', 'D', 'E', 'F'], (_element, index) => (
                  <li key={index} className="seat">
                    <input type="checkbox" disabled={players.includes(`${row + 1}${_element}`)} id={`${row + 1}${_element}`} onClick={() => handleChange(`${row + 1}${_element}`)} />
                    <label htmlFor={`${row + 1}${_element}`}>{`${row + 1}${_element}`}</label>
                  </li>
                ))}
              </ol>
            </li>
          ))
        }
      </ol>
    </div>
  );
}
