import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import someTextFetcher from './utils/text';
import useKeyPress from './hooks/useKeyPress';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('https://animechan.vercel.app/api/random')
    .then((res) => {
      return res.json();
    })
    .then(data => {
      console.log(data.quote);
      setText(data.quote);
      setCurrentChar(data.quote.charAt(0));
      setIncomingChars(data.quote.substr(1));
    });
  }, [])

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );

  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(text.charAt(0));
  const [incomingChars, setIncomingChars] = useState(text.substr(1));
  
  useKeyPress((key) => {
    //1
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    
    //2
    if (key === currentChar) {
      //3
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      //4
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
      
      //5      
      setCurrentChar(incomingChars.charAt(0));
      
      //6
      updatedIncomingChars = incomingChars.substring(1);
      setIncomingChars(updatedIncomingChars);
    }
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
      </header>
    </div>
  );
}

export default App;
