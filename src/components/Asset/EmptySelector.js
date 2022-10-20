import { ethers } from 'ethers';
import { React, useState } from 'react';
import styled from 'styled-components';
import { BsChevronRight } from 'react-icons/bs';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { Colors } from '../Theme';
import { db } from '../tasks/firebase';
import OwnershipItem from './OwnershipItem';
import { deployed } from '../../config';
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json';

const EditionSelectorEl = styled.article`
  display: flex;
  border: 1px solid ${Colors.Border};
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopBtn = styled.span`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;
const BottomBtn = styled(TopBtn)`
  border-bottom: none;
`;
const EdInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const EditionLabel = styled.span`
  font-weight: 500;
`;
const SelectEdition = styled.a`
  color: ${Colors.Primary};
  font-size: 0.95rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-decoration: underline;
  cursor: pointer;
`;
const Content = styled.div`
  padding: 1rem;
`;

export default function EmptySelector({ setReadyToPlay, task, player }) {
  const [hasPlayer, setHasPlayer] = useState(task.players.includes(player));
  const { nftmarketaddress, nftaddress } = deployed;

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

  /* function to update firestore */
  const handleChange = async () => {
    placeBid();
    const taskDocRef = doc(db, 'tasks', task.id);
    try {
      await updateDoc(taskDocRef, {
        players: arrayUnion(player),
      });
      setHasPlayer(true);
      task.players.push(player);
      setReadyToPlay(
        ['2', '3', '4'].every((pos) => task.players.includes(pos)),
      );
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  return (
    hasPlayer
      ? (
        <Content>
          <OwnershipItem />
        </Content>
      ) : (
        <EditionSelectorEl>
          <BtnContainer>
            <TopBtn />
            <BottomBtn />
          </BtnContainer>
          <EdInfo>
            <EditionLabel>Empty</EditionLabel>
          </EdInfo>
          <SelectEdition onClick={handleChange}>
            Join Game<BsChevronRight />
          </SelectEdition>
        </EditionSelectorEl>
      )
  );
}
