import { useState, useEffect } from 'react';


const useKeyPress = (callback: (arg: string | null) => void) => {

  const [keyPressed, setKeyPressed] = useState<string | null>();

  useEffect(() => {

    interface Key {
      key: string;
    }
    const downHandler = ({ key }: Key) => {
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };

    const upHandler = () => {
      setKeyPressed(null);
    };


    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {

      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  return keyPressed;
};

export default useKeyPress;