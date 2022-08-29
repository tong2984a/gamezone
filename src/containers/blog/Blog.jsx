import React from 'react';
import Article from '../../components/article/Article';
import { stardewLogo, tetrisLogo, pokemonLogo, lolLogo, rsLogo } from './imports';
import './blog.css';

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text"><br /> Popular Games</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article imgUrl={rsLogo} date="Sep 26, 2021" text="Worldwide MMMORPG free to play!" />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article imgUrl={stardewLogo} date="Sep 26, 2021" text="Explore vast, mysterious caves: Encounter dangerous monsters and valuable treasures deep underground" />
        <Article imgUrl={tetrisLogo} date="Sep 26, 2021" text="Step into the world of blocks" />
        <Article imgUrl={pokemonLogo} date="Sep 26, 2021" text="Partner up with your favorite Pokemon in an immersive experience" />
        <Article imgUrl={lolLogo} date="Sep 26, 2021" text="Most popular game of 2022" />
      </div>
    </div>
  </div>
);

export default Blog;
