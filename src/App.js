import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const hash = "31d1793ffc28589ecedf05e6d0a38cc4";
const publicKey = "171e333a1dec2eeb5595ef5d54f5d3bc";
// const privateKey = "e883e47a0fcab2a80bf8de905ca542648e6601f8";

let offset = 1540;

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(78);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const result = await axios(`http://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}?ts=1&apikey=${publicKey}&hash=${hash}`);
      setItems(result.data.data.results);
      console.log(result.data.data.results);
      setLoading(false);
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
        {
          <div className="pagination-container">
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
          </div>
        }
      </section>
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

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }

  return <ul>
    {
      posts.map(post => (
        <li key={post.id}> {post.name}</li>
      ))
    }
  </ul>
}

export default App;
