import React, { useEffect, useState } from 'react';
import './App.css';
import useKeyPress from './hooks/useKeyPress';
import { currentTime } from './utils/time';

function App() {
  // states for stats (Sign per minute and words per minute)
  const [startTime, setStartTime] = useState<number>();
  const [signCount, setSignCount] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [spm, setSpm] = useState<string>('0');
  const [wpm, setWpm] = useState<string>('0');
  const [accuracy, setAccuracy] = useState<string>('0');

  // states for the typable text
  const [text, setText] = useState<string>('');
  const [leftPadding, setLeftPadding] = useState<string>(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState<string>('');
  const [currentChar, setCurrentChar] = useState<string>('');
  const [incomingChars, setIncomingChars] = useState<string>('');
  const [typedChars, setTypedChars] = useState<string>('');
  
  // state for wrong char reaction
  const [wrongChar, setWrongChar] = useState<boolean>(false);

  // states for data fetching
  const [api, setApi] = useState<string>('https://animechan.vercel.app/api/random');
  const [fetchCounter, setFetchCounter] = useState<number>(0);

  useEffect(() => {
    fetch(api)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      let neededText = '';
      if (api === 'https://api.quotable.io/random') {
        neededText = data.content;
      } else {
        neededText = data.quote; 
      }
      console.log(neededText);
      setText(neededText);
      setCurrentChar(neededText.charAt(0));
      setIncomingChars(neededText.substr(1));
    }).catch(err => setText(err));
  }, [api, fetchCounter])
  
  useKeyPress((key) => {
    //1
    let updatedOutgoingChars:string = outgoingChars;
    let updatedIncomingChars:string = incomingChars;
    
    if (!startTime) {
      setStartTime(currentTime());
    }

    //2
    if (key === currentChar) {
      //3

      setWrongChar(false);
      const updatedTypedChars:string = typedChars + key;
      setTypedChars(updatedTypedChars);

      setAccuracy(
        ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(2)
        );

      setSignCount(signCount + 1);
      const durationInMinutes = (currentTime() - startTime!) / 60000.0;
      setSpm(((signCount + 1) / durationInMinutes).toFixed(2));

      if (incomingChars.charAt(0) === ' ') {
        //4
        setWordCount(wordCount + 1);
        //5
        const durationInMinutes: number = (currentTime() - startTime!) / 60000.0;
        //6
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }

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
    } else {
      setWrongChar(true);
    }
  })

  

  return (
    <div className="App">
      <main className="App-body">
        <h1 className="header">BLIND TYPING THINGY</h1>
        <h2 className="facey">(͠≖ ͜ʖ͠≖)👌</h2>
        <p className= "whole-string">This is what you are going to type, enjoy (anime quotes by default xD): '{text}'</p>
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className={wrongChar ? "Character-current-wrong" : "Character-current"}>{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3 className="stats">Signs Per Minute: {spm} | Words Per Minute: {wpm}</h3>
        <h3 className="stats">Accuracy: {accuracy}</h3>
        <p>If you're finished please choose what you'd like to type:</p>
        <p className='commentary'>You can choose what you want to type from a WIDE range of opportunities! What are you interested in?</p>
        <p className='api-changers'>
          <span className="api-changer" onClick={() => {
            setApi('https://api.quotable.io/random');
            setFetchCounter(fetchCounter + 1);
            }}>Some deep thoughts...</span>
          <span className="api-changer" onClick={() => {
            setApi('https://animechan.vercel.app/api/random');
            setFetchCounter(fetchCounter + 1);
            }}>Anime quotes!</span>
          <span className="api-changer" onClick={() => {
            setApi('https://api.kanye.rest');
            setFetchCounter(fetchCounter + 1);
            }}>Maybe... Kanye West quotes?..</span>
        </p>
      </main>
    </div>
  );
}

export default App;
