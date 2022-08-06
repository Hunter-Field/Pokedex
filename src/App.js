import React from 'react';
import API from './component/API';
import './App.css';
import picture from './pokedex-logo.png';

function App(props) {
  return (
    <div className="title">
      <img src={picture} className="picture" alt="Pokedex"/>
      <h2>by Hunter Field</h2>
      <hr/>
      <h3>Click on a Pokemon to see its shiny form!</h3>
      <div id="program">
        <API/>
      </div>
    </div> 
  );
}

export default App;