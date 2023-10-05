import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './TDL/TodoList.js';
import TodoList from './TDL/TodoList.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>  Junes' Jobs </p>
        <TodoList />
      </header>
    </div>
  );
}

export default App;
