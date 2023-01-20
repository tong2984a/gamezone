import { React, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { IoMdShareAlt } from 'react-icons/io';
import { BsHeart, BsFillEyeFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Colors, Devices } from '../components/Theme';
import Tabs from '../components/styled/Tabs.styled';
import Seatings from '../components/Asset/Seatings';
import Ticket from '../components/tasks/Ticket';

const AssetEl = styled.article`
  background-color: ${Colors.White};
  color: ${Colors.Black};
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media ${Devices.Laptop} {
    padding: 1rem 15%;
  }
`;
const SectionContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  @media ${Devices.Laptop} {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex: 0.7rem;
  flex-direction: column;
  gap: 1rem;
`;
const ImageEl = styled.div`
  border-radius: 30px;
  overflow: hidden;
`;
const ChainLink = styled.a`
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  align-items: center;
  border: 1px solid ${Colors.Border};
  padding: 1.5rem 1rem;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 0.95;
`;
const TopBtns = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    font-size: 1.5rem;
  }
`;

const LikesBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewsEl = styled(LikesBtn)``;
const ShareBtn = styled(LikesBtn)``;
const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Tag = styled.span`
  border: 1px solid ${Colors.Black};
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

export default function Match() {
  const [openAddTicketModal, setOpenAddTicketModal] = useState(false);
  const { title } = useParams();
  const AllTabs = [
    { Id: 1, Title: '參加比賽', Content: <Seatings title={title} /> },
  ];

  return (
    <AssetEl>
      <SectionContainer>
        <LeftSection>
          <ImageEl>
            <img
              src="/images/club/stumbleguys.png"
              width="100%"
              height="100%"
            />
          </ImageEl>
          <ChainLink>
            View On-Chain details <HiOutlineExternalLink onClick={() => setOpenAddTicketModal(true)} />
          </ChainLink>
        </LeftSection>
        <RightSection>
          <TopBtns>
            <LikesBtn>
              <BsHeart />
              710
            </LikesBtn>
            <ViewsEl>
              <BsFillEyeFill />
              16177
            </ViewsEl>
            <ShareBtn>
              <IoMdShareAlt />
              Share
            </ShareBtn>
          </TopBtns>
          <TagContainer>
            <Tag>Crypto</Tag>
            <Tag>Speed Games</Tag>
            <Tag>Flat Rate</Tag>
          </TagContainer>
          <Tabs mt="1rem" data={AllTabs} />
        </RightSection>
      </SectionContainer>

      {openAddTicketModal
      && (
        <Ticket onClose={() => setOpenAddTicketModal(false)} open={openAddTicketModal} />
      )}
    </AssetEl>
  );
}
