import React from 'react';
import styled from 'styled-components';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { AiFillCaretLeft } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { BsHeart, BsFillEyeFill, BsThreeDots } from 'react-icons/bs';
import { Colors, Devices } from '../components/Theme';
import Tab from '../components/styled/Tab.styled';
import Tabs from '../components/styled/Tabs.styled';
import EmptySelector from '../components/Asset/EmptySelector';
import OwnershipItem from '../components/Asset/OwnershipItem';
import BidSticky from '../components/Asset/BidSticky';

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
const BackBtn = styled.span`
  color: ${Colors.Primary};
  display: flex;
  width: max-content;
  cursor: pointer;
  align-items: center;
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
const MoreBtn = styled(LikesBtn)`
  margin-left: auto;
`;

const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
const AvatarEl = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;
const CreatorLabel = styled.label`
  color: ${Colors.Gray};
  font-size: 0.9rem;
`;
const UsernameEl = styled.span``;
const EditionEl = styled.span`
  font-weight: 500;
`;
const Title = styled.h1`
  font-size: 1.7rem;
  display: inline-block;
  margin-right: 1rem;
`;
const MarketPlace = styled.span`
  border: 1px solid ${Colors.Gray};
  border-radius: 50px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${Colors.Gray};
`;
const AcOfferLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${Colors.Gray};
`;
const Des = styled.p`
  white-space: pre-wrap;
`;
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

const AllTabs = [
  { Id: 1, Title: 'Players', Content: <OwnershipItem /> },
  { Id: 2, Title: 'Scoreboard', Content: <Tab /> },
  { Id: 3, Title: 'Similar Games', Content: <Tab /> },
  { Id: 4, Title: 'Medals & Stats', Content: <Tab /> },
];

export default function Asset() {
  return (
    <AssetEl>
      <SectionContainer>
        <LeftSection>
          <ImageEl>
            <img
              src="/images/club/Feudal_War.S.jpg"
              width="100%"
              height="100%"
            />
          </ImageEl>
          <ChainLink>
            View On-Chain details <HiOutlineExternalLink />
          </ChainLink>
        </LeftSection>
        <RightSection>
          <BackBtn>
            <AiFillCaretLeft />
            Back
          </BackBtn>
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
            <MoreBtn>
              <BsThreeDots />
            </MoreBtn>
          </TopBtns>
          <AuthorContainer>
            <AvatarEl>
              <img src="/images/avatar/newk3d.png" width="50" height="50" />
            </AvatarEl>
            <span>
              <CreatorLabel>Creator</CreatorLabel>
              <UsernameEl>Holystargazer</UsernameEl>
            </span>
          </AuthorContainer>
          <EditionEl>371 Rounds Minted</EditionEl>
          <span>
            <Title>FEUDAL WAR</Title>
            <MarketPlace>30 Rounds</MarketPlace>
          </span>
          <AcOfferLabel>Accepting Offers</AcOfferLabel>
          <Des>
            Feudal War has a total of 82 regions as either part of a kingdom or
            not. There are six total kingdoms, each has eight regions within its
            borders, including the castle.
          </Des>
          <TagContainer>
            <Tag>Crypto</Tag>
            <Tag>Speed Games</Tag>
            <Tag>Flat Rate</Tag>
          </TagContainer>
          <Tabs mt="1rem" data={AllTabs} />
          <EmptySelector />
          <EmptySelector />
          <EmptySelector />
        </RightSection>
      </SectionContainer>
      <BidSticky />
    </AssetEl>
  );
}
