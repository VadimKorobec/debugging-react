import { useRef, useState } from "react";

import ResultModal from "./ResultModal";

interface TimerChallengeProps {
  title: string;
  targetTime: number;
}

const TimerChallenge = ({ title, targetTime }: TimerChallengeProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(targetTime * 1000);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    dialogRef.current?.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prevState) => prevState - 10);
    }, 10);
  };

  const handleStop = () => {
    dialogRef.current?.open();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
