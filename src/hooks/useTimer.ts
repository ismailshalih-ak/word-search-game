import { useState, useEffect } from 'react';

const useTimer = (duration: number, onTimerEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          onTimerEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, onTimerEnd]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = (newDuration = duration) => {
    setIsRunning(false);
    setTimeLeft(newDuration);
  };

  return { timeLeft, isRunning, startTimer, stopTimer, resetTimer };
};

export default useTimer;
