import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Stopwatch() {
  const [time, setTime] = useState(0); // Milliseconds elapsed
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 10), 10);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]); // Only update effect when isRunning changes

  const formattedTime = () => {
    const hours = Math.floor((time / 3600000) % 24);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor(time / 10) % 100;

    return [
      hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '',
      minutes.toString().padStart(2, '0') + ':',
      seconds.toString().padStart(2, '0') + '.',
      milliseconds.toString().padStart(2, '0'),
    ].join('');
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => setTime(0);

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="timer">{formattedTime()}</div>
      <div className="controls">
        <button className="start" onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button className="stop" onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch