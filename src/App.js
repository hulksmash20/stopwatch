import { useEffect, useRef, useState } from "react";
import "./App.css";
import RestoreIcon from "@mui/icons-material/Restore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsrunning] = useState(false);
  const [degree, setDegree] = useState(0);
  const [final, setFinal] = useState([]);

  let timer = useRef();

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const handleStart = () => {
    setIsrunning(true);
    timer.current = setInterval(() => {
      setTime((prev) => prev + 1);
      setDegree((prev) => (prev + 6 >= 360 ? 0 : prev + 6));
    }, 1000);
  };

  const handlePause = () => {
    setIsrunning(false);
    clearInterval(timer.current);
  };

  const handleStop = () => {
    setIsrunning(false);
    const x = time;
    setFinal([...final, x]);
    clearInterval(timer.current);
    setTime(0);
    setDegree(0);
  };

  const handleReset = () => {
    setIsrunning(false);
    clearInterval(timer.current);
    setTime(0);
    setDegree(0);
    setFinal([]);
  };

  return (
    <div className="App">
      <div className="clockArea">
        <div
          className="outerClock"
          style={{
            backgroundImage: `conic-gradient(red 0deg, #FA8912 ${degree}deg, transparent ${degree}deg)`,
          }}
        >
          <div className="clock">
            <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
          </div>
        </div>
        {final.length > 0 && (
          <div className="displayTime">
            <div>Elapsed Time: </div>
            <ol className="list">
              {final.map((x, i) => {
                return (
                  <li>
                    <span>{("0" + Math.floor((x / 60) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor(x % 60)).slice(-2)}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
        <div className="buttonArea">
          <button onClick={handleStop}>
            <StopIcon style={{ fill: "#FB770D" }} />
          </button>
          <button onClick={isRunning ? handlePause : handleStart}>
            {isRunning ? (
              <PauseIcon style={{ fill: "#FB770D" }} />
            ) : (
              <PlayArrowIcon style={{ fill: "#FB770D" }} />
            )}
          </button>
          <button onClick={handleReset}>
            <RestoreIcon style={{ fill: "#FB770D" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
