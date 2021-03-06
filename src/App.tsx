import React, { useEffect, useState } from 'react';
import './App.css';
import useKeyPress from './hooks/useKeyPress';
import { currentTime } from './utils/time';
import ApiChangers from './components/apiChanger';
import ResetterButtons from './components/resetterButtons';
import Character from './components/character';

function App() {
  // states for stats (sign per minute, words per minute and accuracy)
  const [startTime, setStartTime] = useState<number>();
  const [signCount, setSignCount] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [spm, setSpm] = useState<string>('0');
  const [wpm, setWpm] = useState<string>('0');
  const [accuracy, setAccuracy] = useState<string>('0');
  const [typedChars, setTypedChars] = useState<string>('');

  // states for the typable text
  const [text, setText] = useState<string>('');
  const [leftPadding, setLeftPadding] = useState<string>(new Array(20).fill(' ').join(''));
  const [outgoingChars, setOutgoingChars] = useState<string>('');
  const [currentChar, setCurrentChar] = useState<string>('');
  const [incomingChars, setIncomingChars] = useState<string>('');
  
  // state for wrong char reaction
  const [wrongChar, setWrongChar] = useState<boolean>(false);

  // states for data fetching
  const [api, setApi] = useState<string>('https://animechan.vercel.app/api/random');
  const [fetchProvoker, setFetchProvoker] = useState<number>(0);
  
  // data fetcher
  useEffect(() => {
    fetch(api)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Couldn't fetch the data");
      }
      return res.json();
    })
    .then(data => {
      let neededText = '';
      if (api === 'https://api.quotable.io/random') {
        neededText = data.content;
      } else {
        neededText = data.quote; 
      }
      setText(neededText);
      setCurrentChar(neededText.charAt(0));
      setIncomingChars(neededText.substr(1));
    }).catch(err => alert(`Something went wrong: ${err.message}`));
  }, [api, fetchProvoker])
  
  // callback that includes typing checker functionality
  useKeyPress((key) => {
    let updatedOutgoingChars:string = outgoingChars;
    let updatedIncomingChars:string = incomingChars;
    
    if (!startTime) {
      setStartTime(currentTime());
    }

    if (key === currentChar) {

      setWrongChar(false);

      setSignCount(signCount + 1);

      if (incomingChars.charAt(0) === ' ') {
        setWordCount(wordCount + 1);
        const durationInMinutes: number = (currentTime() - startTime!) / 60000.0;

        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
        setSpm(((signCount + 1) / durationInMinutes).toFixed(2));
      }

      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
          
      setCurrentChar(incomingChars.charAt(0));
      
      updatedIncomingChars = incomingChars.substring(1);
      setIncomingChars(updatedIncomingChars);
    } else {
      setWrongChar(true);
    }
    // setting up accuracy
    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(2)
    );
  })

  // functions for interactive components
  const handleApiChangerClick = (apiUrl: string) => {
    setApi(apiUrl);
    setFetchProvoker(fetchProvoker + 1);
  }

  const handleSpeedometerResetterClick = (): void => {
    setStartTime(currentTime());
    setWordCount(0);
    setSignCount(0);
    setWpm('0');
    setSpm('0');
  }

  const handleOutCharsResetterClick = (): void => {
    setLeftPadding(new Array(20).fill(' ').join(''));
    setTypedChars('');
    setOutgoingChars('');
    setAccuracy('0');
  }

  return (
    <div className="App">
      <main className="App-body">
        <h1 className="header">BLIND TYPING THINGY</h1>
        <h2 className="facey">(????? ?????????)????</h2>
        <p className= "whole-string">{text ? `This is what you are going to type, enjoy (anime quotes by default xD): ${text}` : 'Loading...'}</p>
        <Character 
        leftPadding={leftPadding} 
        outgoingChars={outgoingChars} 
        wrongChar={wrongChar}
        currentChar={currentChar}
        incomingChars={incomingChars}/>
        <h3 className="stats">Signs Per Minute: {spm} | Words Per Minute: {wpm}</h3>
        <ResetterButtons 
        handleSpeedometerResetterClick={handleSpeedometerResetterClick} 
        handleOutCharsResetterClick={handleOutCharsResetterClick}/>
        <h3 className="stats">Accuracy: {accuracy}%</h3>
        <p>{(currentChar === '') ? "Please choose what you'd like to type next:": ''}</p>
        <p className='commentary'>You can choose what you want to type from a WIDE range of opportunities! What are you interested in?</p>
        <ApiChangers handleApiChangerClick={handleApiChangerClick}/>
      </main>
    </div>
  );
}

export default App;
