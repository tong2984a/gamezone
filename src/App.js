import React from 'react';

import { Footer, Header } from './containers';
import { Navbar } from './components';

import './App.css';

const App = () => (
  <div className="App">
    <div className="greed__bg">
      <Navbar />
      <Header />
    </div>
    <Footer />
  </div>
);

export default App;
