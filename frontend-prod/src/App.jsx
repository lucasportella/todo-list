import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Header from './components/Header';

const App = () => (
  <div className="App">
    <Header className="App-header" />
    <Tasks />
  </div>
);

export default App;
