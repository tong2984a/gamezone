import { ethers } from 'ethers';
import { React, useState, useEffect } from 'react';
import { doc, arrayUnion, updateDoc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../tasks/firebase';
import './Seatings.css';

// import { deployed, chains } from '../../config';
import { deployed } from '../../config';
// import USDC from '../../artifacts/contracts/TokenFarm.sol/USDC.json';
import Game from '../../artifacts/contracts/Game.sol/Game.json';

const envChainName = deployed.envChain.name;
const envChainId = deployed.envChain.id;
// const { gameAddress, tokenFarmAddress } = deployed;
const { gameAddress } = deployed;
console.log('commented out for now', Game, gameAddress);
// const usdcContractAddress = chains.mumbai.usdc.contractAddress;

export default function Seatings({ title }) {
  const [task, setTask] = useState();
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(1);
  const [seats, setSeats] = useState([]);
  const [cause, setCause] = useState('');
  const [processStatus, setProcessStatus] = useState('');
  const [hasBets, setHasBets] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountName, setAccountName] = useState('');
  const [nameInput, setNameInput] = useState('');

  async function ethAccountsRequest() {
    if (window.ethereum) {
      const result = await Promise.all([
        window.ethereum.request({ method: 'eth_requestAccounts' }),
        window.ethereum.request({ method: 'eth_chainId' }),
      ]).catch((error) => {
        if (error.code === 4001) {
          throw new Error('Please check your wallet and try again', { cause: 'Connection request has been rejected. ' });
        } else if (error.code === -32002) {
          throw new Error('Please check your wallet and try again', { cause: error.message });
        } else {
          throw new Error('Please check your wallet and try again', { cause: error.message });
        }
      });
      if (result) {
        const [accounts, chainId] = result;
        console.log('error1', result, envChainId);
        if (accounts.length === 0) {
          throw new Error('Please check your wallet and try again', { cause: 'MetaMask is locked or the user has not connected any accounts' });
        }
        if (chainId !== envChainId) {
          throw new Error('Please check your wallet and try again', { cause: `Error - Is your wallet connected to ${envChainName}?` });
        }
        return accounts[0];
      }
    }
    throw new Error('Non-Ethereum browser detected.', { cause: 'You should consider installing MetaMask' });
  }

  const checkBets = async (doc1Seats, doc1ScreenNames) => {
    try {
      const account = await ethAccountsRequest();
      setAccountAddress(account);
      if (doc1Seats.some((e) => e.account.toUpperCase() === account.toUpperCase())) {
        setHasBets(true);
      }
      doc1ScreenNames.forEach((e) => {
        if (e.accountAddress.toUpperCase() === account.toUpperCase()) {
          setAccountName(e.accountName);
        }
      });
    } catch (err) {
      console.error(err);
      setProcessStatus('');
      setMessage(err.message);
      setCause(err.cause);
    }
  };

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(collection(db, 'gamings'), where('title', '==', title));
    onSnapshot(taskColRef, (snapshot) => {
      snapshot.forEach((doc1) => {
        setTask({
          id: doc1.id,
          data: doc1.data(),
          title: doc1.data().title,
          gameId: doc1.data().gameId,
          imageUrl: doc1.data().imageUrl,
          edition: doc1.data().edition,
          stock: doc1.data().stock,
          badge: doc1.data().badge,
          price: doc1.data().price,
          avatar: doc1.data().avatar,
          author: doc1.data().author,
          likes: doc1.data().likes,
        });
        setSeats(doc1.data().seats ?? []);
        setPrice(doc1.data().price);
        setStock(doc1.data().stock);
        checkBets(doc1.data().seats ?? [], doc1.data().screenNames ?? []);
      });
    });
  }, []);

  const placeBid = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const valueInEther = ethers.utils.parseUnits('0.1', 'ether');
      // const contract = new ethers.Contract(gameAddress, Game.abi, signer);
      // const transaction = await contract.makeBet({ value: valueInEther });

      const gameContract = new ethers.Contract(gameAddress, Game.abi, signer);
      const tx = await gameContract.connect(signer).joinGame(task.gameId, { value: valueInEther });
      const rc = await tx.wait();
      const event = rc.events.find((e) => e.event === 'JoinGame');
      if (event) {
        console.log('count players', parseInt(event.data.toString(), 16));
      }
      // const amount = ethers.utils.parseUnits('1', 6);
      // const erc20Contract = new ethers.Contract(usdcContractAddress, USDC.abi, signer);
      // const transaction = await erc20Contract.connect(signer).transfer(tokenFarmAddress, amount);
      // const tx = await transaction.wait();
      // console.log(tx.events);
    } catch (error) {
      if (error.code === -32603) {
        console.error({ title: 'Error - Please check your wallet and try again.', message: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
        throw new Error('Error - Please check your wallet and try again.', { cause: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
      } else {
        console.error({ title: 'Error - Please check your wallet and try again.', message: error.message });
        throw new Error('Error - Please check your wallet and try again.', { cause: error.message });
      }
    }
  };

  /* function to update firestore */
  const handleNameChange = async () => {
    setAccountName(nameInput);
    const taskDocRef = doc(db, 'gamings', task.id);
    await updateDoc(taskDocRef, {
      screenNames: arrayUnion({ accountName: nameInput, accountAddress }),
    });
  };

  /* function to update firestore */
  const handleChange = async (player) => {
    try {
      setProcessStatus('Processing your bet, please wait ...');
      setMessage('');
      setCause('');
      const account = await ethAccountsRequest();
      if (seats.some((e) => e.account.toUpperCase() === account.toUpperCase())) {
        throw new Error('Your wallet has already registered.', { cause: '' });
      }
      await placeBid();
      const taskDocRef = doc(db, 'gamings', task.id);
      await updateDoc(taskDocRef, {
        seats: arrayUnion({ account, player }),
      });
      setProcessStatus('You successfully placed a bet');
    } catch (err) {
      console.error(err);
      setProcessStatus('');
      setMessage(err.message);
      setCause(err.cause);
    }
    return false;
  };

  return (
    <div className="theatre">
      <div className="screen-side">
        <h3 className="select-text">入場費 {price} ETH</h3>
        { accountAddress && <h3 className="account-text">{accountAddress}</h3>}
        { accountName
        && (
          <>
            <h3 className="account-text">Hi {accountName}, your PIN is 357.</h3>
            <h3 className="account-text">Click <a id="link" href="http://3046.chickenkiller.com:8000/claim">HERE</a> to play your games.</h3>
          </>
        )}
        <h1 className="error-text">{message}</h1>
        <h1 className="error-text">{cause}</h1>
      </div>
      <ol className="cabin">
        { hasBets && !accountName
        && (
          <div className="screen-side">
            <p>Screen name must match your in-game avatar</p>
            <input
              id="bettor"
              type="text"
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter screen name"
            />
            <button type="button" onClick={() => handleNameChange()}>ENTER</button>
          </div>
        )}
        { processStatus
          ? (
            <div className="screen-side">
              <br />
              <h1>{processStatus}</h1>
            </div>
          )
          : Array.from({ length: stock }, (_rowElement, row) => (
            <li key={row} className={`row row--${row + 1}`}>
              <ol className="seats" type="A">
                {Array.from(['A', 'B', 'C', 'D', 'E', 'F'], (_element, index) => (
                  (row * 6) + index < stock
                  && (
                    <li key={index} className="seat">
                      <input type="checkbox" disabled={seats.some((e) => e.player === `${row + 1}${_element}`)} id={`${row + 1}${_element}`} onClick={() => handleChange(`${row + 1}${_element}`)} />
                      <label htmlFor={`${row + 1}${_element}`}>{`${(row * 6) + index + 1}`}</label>
                    </li>
                  )
                ))}
              </ol>
            </li>
          ))}
      </ol>
    </div>
  );
}
