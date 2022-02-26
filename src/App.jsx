import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Tasks />
    </div>
  );
}

export default App;
