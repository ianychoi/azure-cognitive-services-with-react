import React, { useState } from 'react';
import microsoft_logo from './microsoft-logo.svg';
import heart_symbol from './heart.svg';
import react_logo from './logo.svg';
import './App.css';

const URLAPI = `/api`

function App() {

  // eslint-disable-next-line
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const [image, setImage] = useState('https://www.kienyke.com/wp-content/uploads/2018/10/selfie.jpg')

  const handleOnChange = event => {
    setImage(event.target.value)
  }

  const handleClickImage = async event => {
    event.preventDefault()
    console.log('click')
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        })
      }

      const resp = await fetch(`${URLAPI}/create-facelist`, fetchOptions)
      const people = await resp.json()
      console.log(people.data)
      setData(people.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Azure Cognitive Services with React!
        </p>
        <p className="Logos">
          <img src={microsoft_logo} className="Microsoft-logo" alt="azure-logo" /> <img src={heart_symbol} className="Heart-symbol" alt="heart-symbol" /> <img src={react_logo} className="React-logo" alt="react-logo" />
        </p>
        <p>
          Image URL for Face API:
        </p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image"
            onChange={handleOnChange}
            value={image} style={{width: "450px"}}
          />
          <button
            className="buttonFile"
            onClick={handleClickImage}
          >
            Upload &amp; Check
          </button>
        </div>
        <h4 className="titleAtribute">Image attributes: </h4>
        <ul>
        {
          data.map(item => (
            <li key={item.faceId}>
              <span>
                Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
              </span>
            </li>
          ))
        }
        </ul>
        <img
          src={image}
          width={220}
          height={180}
          alt={image}
        />
        Link of the image: <a
          className="App-link"
          href={image}
          target="_blank"
          rel="noopener noreferrer"
        >
          {image}
        </a>
      </header>
    </div>
  );
}

export default App;
