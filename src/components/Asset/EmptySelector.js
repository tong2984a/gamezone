import React from 'react';
import styled from 'styled-components';
import { BsChevronRight } from 'react-icons/bs';
import { Colors } from '../Theme';

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
`;

export default function EmptySelector() {
  return (
    <EditionSelectorEl>
      <BtnContainer>
        <TopBtn />
        <BottomBtn />
      </BtnContainer>
      <EdInfo>
        <EditionLabel>Empty</EditionLabel>
      </EdInfo>
      <SelectEdition href="#">
        Join Game<BsChevronRight />
      </SelectEdition>
    </EditionSelectorEl>
  );
}
