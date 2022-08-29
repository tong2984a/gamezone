import React from 'react';
import styled from 'styled-components';
import { MdOutlineContentCopy } from 'react-icons/md';
import { Colors } from '../Theme';

const OwnershipItemEl = styled.article`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const AvatarEl = styled.span`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
`;
const Info = styled.div`
  display: flex;
  flex: 1;
  gap: 0.25rem;
  flex-direction: column;
`;
const OwnerEl = styled.span`
  font-size: 0.9rem;
  color: ${Colors.Gray};
`;
const UsernameEl = styled.span`
  font-weight: 500;
`;
const AddressEl = styled.div`
  color: ${Colors.Gray};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function OwnershipItem() {
  return (
    <OwnershipItemEl>
      <AvatarEl>
        <img src="/images/avatar/deathrow.jpg" width="45px" height="45px" />
      </AvatarEl>
      <Info>
        <OwnerEl>Player 1</OwnerEl>
        <UsernameEl>DeathRow</UsernameEl>
      </Info>
      <AddressEl>
        0x31...545D
        <MdOutlineContentCopy />
      </AddressEl>
    </OwnershipItemEl>
  );
}
