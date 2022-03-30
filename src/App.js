import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const hash = "31d1793ffc28589ecedf05e6d0a38cc4";
const publicKey = "171e333a1dec2eeb5595ef5d54f5d3bc";

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`);
      setItems(result.data.data.results);
      console.log(result.data.data.results);
    }
    fetch();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <img src='./images/heroes.png' className="heroes" alt='Heroes' />
        <img src='./images/marvel.png' className="marvel" alt='Marvel' />
      </div>
      <section className="hero-container">
        {
          items.map(item => (
            <CharacterCard key={item.id} item={item}></CharacterCard>
          ))
        }
      </section>

      {/* <div className="pagination-container">
        <a href=".">
          <img className="left-icon" src="./icons/left.png" alt="Left Icon" />
        </a>
        <a href=".">1</a>
        <a href=".">...</a>
        <a href=".">99</a>
        <a className="selected-page" href=".">100</a>
        <a href=".">101</a>
        <a href=".">...</a>
        <a href=".">200</a>
        <a href=".">
          <img className="right-icon" src="./icons/right.png" alt="Right Icon" />
        </a>
      </div> */}

    </div>
  );
}

const CharacterCard = ({ item }) => {
  return (
    <div className="container">
      <div className="hero-container">
        <div className="hero-card">
          <figure>
            <img src={item.thumbnail.path + "." + item.thumbnail.extension} />
            <figcaption>{item.name}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default App;
