import { useState, useEffect } from 'react';

//1
const useKeyPress = (callback: (arg: string | null) => void) => {
  //2
  const [keyPressed, setKeyPressed] = useState<string | null>();
  //3
  useEffect(() => {
    //4
    interface Key {
      key: string;
    }
    const downHandler = ({ key }: Key) => {
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    //5
    const upHandler = () => {
      setKeyPressed(null);
    };

    //6
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      //7
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  //8
  return keyPressed;
};

export default useKeyPress;