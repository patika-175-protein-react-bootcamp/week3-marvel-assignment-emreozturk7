import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const hash = "31d1793ffc28589ecedf05e6d0a38cc4";
const publicKey = "171e333a1dec2eeb5595ef5d54f5d3bc";


function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxElement, setMaxelement] = useState();
  const [offsetValue, setOffsetvalue] = useState(0);


  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const result = await axios(`http://gateway.marvel.com/v1/public/characters?offset=${offsetValue}?limit=20?ts=1&apikey=${publicKey}&hash=${hash}`);
      setItems(result.data.data.results);
      setMaxelement(result.data.data.total / result.data.data.limit);
      setLoading(false);
    }
    fetch();
  }, [offsetValue]);

  function nextPage() {
    if (currentPage !== 78) {
      setCurrentPage(currentPage + 1);
      setOffsetvalue(offsetValue + 20);
    }

  }
  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setOffsetvalue(offsetValue - 20);
    }
  }
  return (
    <div className="App">
      <div className="header">
        <img src='./images/heroes.png' className="heroes" alt='Heroes' />
        <img src='./images/marvel.png' className="marvel" alt='Marvel' />
      </div>
      <section className="hero-container">
        {
          items.map(item => (
            <CharacterCard key={item.id} item={item} loading={loading}></CharacterCard>
          ))
        }
        {
          <div className="pagination-container">
            <button onClick={() => previousPage()}>
              <img className="left-icon" src="./icons/left.png" alt="Left Icon" />
            </button>

            <a className="unselected-page" href=".">
              {
                currentPage === 1 || currentPage === 2 || currentPage === 3
                  ? null
                  : 1
              }
            </a>

            <a className="unselected-page" href=".">
              {
                currentPage === 1 || currentPage === 2 || currentPage === 3
                  ? currentPage === 3
                    ? 1
                    : null
                  : "..."
              }
            </a>

            <a className="unselected-page" href=".">{currentPage === 1 ? null : currentPage - 1}</a>
            <a className="selected-page" href=".">{currentPage}</a>
            <a className="unselected-page" href=".">{currentPage === maxElement ? null : currentPage + 1}</a>

            <a className="unselected-page" href=".">
              {
                currentPage === maxElement || currentPage === maxElement - 1 || currentPage === maxElement - 2
                  ? currentPage === maxElement - 2
                    ? maxElement
                    : null
                  : "..."
              }
            </a>

            <a className="unselected-page" href=".">
              {
                currentPage === maxElement || currentPage === maxElement - 1 || currentPage === maxElement - 2
                  ? null
                  : maxElement
              }
            </a>

            <button onClick={() => nextPage()}>
              <img className="right-icon" src="./icons/right.png" alt="Right Icon" />
            </button>
          </div>
        }
      </section>
    </div>
  );
}

const CharacterCard = ({ item, loading }) => {
  return (
    <div className="container">
      <div className="hero-container">
        <div className="hero-card">
          {
            loading === false
              ?
              <figure>
                <img className="card-images" alt={item.name} src={item.thumbnail.path + "." + item.thumbnail.extension} />
                <figcaption>{item.name}</figcaption>
              </figure>
              :
              <figure>
                <img className="loading" alt="Loading" src="./images/loading.png" />
              </figure>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
