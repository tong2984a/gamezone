import { ethers } from 'ethers';
import React from 'react';
import styled from 'styled-components';
import Button from '../styled/Button.styled';
import { Colors, Devices } from '../Theme';
import { deployed } from '../../config';
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json';

const BidStickyEl = styled.article`
  box-shadow: 0 4px 40px rgb(0 0 0 /10%);
  border: 1px solid ${Colors.Border};
  padding: 0.8rem 1rem;
  border-radius: 5px;
  display: flex;
  position: sticky;
  background-color: ${Colors.White};
  bottom: 1rem;
`;
const LeftSection = styled.div`
  display: none;
  flex: 1;
  gap: 1rem;
  @media ${Devices.Laptop} {
    display: flex;
  }
`;
const ThumbEl = styled.span`
  width: 80px;
  height: 80px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EditionEl = styled.span`
  font-weight: 500;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  align-items: center;

  @media ${Devices.Laptop} {
    flex: 0.6;
  }
`;
const PlaceBidBtn = styled(Button)`
  flex: 1;
  width: 100%;
  font-size: 1.07rem;
`;
const TextEl = styled.span`
  color: ${Colors.Gray};
  font-size: 0.7rem;
`;

export default function BidSticky() {
  const { nftmarketaddress, nftaddress } = deployed;

  const placeBid = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const market = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    const price = ethers.utils.parseUnits('0.01', 'ether');
    try {
      const transaction = await market.createMarketSale(nftaddress, 3, { value: price });
      await transaction.wait();
    } catch (error) {
      if (error.code === -32603) {
        console.error({ title: 'Error - Please check your wallet and try again.', message: 'It is very possible that the RPC endpoint you are using to connect to the network with MetaMask is congested or experiencing technical problems' });
      } else {
        console.error({ title: 'Error - Please check your wallet and try again.', message: error.message });
      }
    }
  };

  return (
    <BidStickyEl>
      <LeftSection>
        <ThumbEl>
          <img src="/images/club/feudal_war.png" width="80px" height="80px" />
        </ThumbEl>
        <Info>
          <EditionEl>Round 17 of 30</EditionEl>
          <Title>FEUDAL WAR</Title>
        </Info>
      </LeftSection>
      <RightSection>
        <PlaceBidBtn onClick={placeBid}>派彩 $$$</PlaceBidBtn>
        <TextEl>A 10% royalty goes to the creator for future payout</TextEl>
      </RightSection>
    </BidStickyEl>
  );
}
