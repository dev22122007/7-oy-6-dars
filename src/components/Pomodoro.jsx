// Pomodoro.js
import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [timer, setTimer] = useState(1500); // 25 daqiqa
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        if (timer === 0) {
          if (isBreak) {
            setIsBreak(false);
            setTimer(1500); // 25 daqiqa
            setPomodoroCount(count => count + 1);
          } else {
            setIsBreak(true);
            setTimer(300); // 5 daqiqa
          }
        } else {
          setTimer(prevTimer => prevTimer - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isRunning, isPaused, isBreak]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsBreak(false);
    setTimer(1500); // 25 daqiqa
    setPomodoroCount(0);
  };

  const handleStartClick = () => {
    startTimer();
  };

  const handlePauseClick = () => {
    pauseTimer();
  };

  const handleShortBreakClick = () => {
    setIsBreak(true);
    setTimer(300); // 5 daqiqa
    startTimer();
  };

  const handlePomodoroCount = () => {
    setPomodoroCount(count => count + 1);
  };

  return (
    <div>
      <div>Timer: {Math.floor(timer / 60)}:{(timer % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</div>
      <div>Pomodoro Count: {pomodoroCount}</div>
      {!isRunning && !isPaused && (
        <button onClick={handleStartClick}>Start</button>
      )}
      {isRunning && !isPaused && (
        <button onClick={handlePauseClick}>Pause</button>
      )}
      {(!isRunning || isPaused) && (
        <button onClick={resetTimer}>Reset</button>
      )}
      {!isBreak && !isRunning && !isPaused && (
        <button onClick={handleShortBreakClick}>Short Break</button>
      )}
      {isBreak && !isRunning && !isPaused && (
        <button onClick={handlePomodoroCount}>Pomodoro Count</button>
      )}
    </div>
  );
};

export default Pomodoro;
