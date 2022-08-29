import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App';
import TopCollectibles from './routes/TopCollectibles';
import Asset from './routes/Asset';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="games" element={<TopCollectibles />} />
      <Route path="asset" element={<Asset />} />
    </Routes>
  </BrowserRouter>, document.getElementById('root'),
);
