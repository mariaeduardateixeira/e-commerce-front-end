import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar/menuBar';
import "./style.css" 

function App() {
  return (
    <div className="body">
      <div className='corpo'>
        <header className="App-header">
          <MenuBar/>
        </header>
      </div>
    </div>
  );
}

export default App;
