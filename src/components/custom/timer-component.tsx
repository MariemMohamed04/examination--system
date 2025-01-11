/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// Timer Component
import React, { useEffect, useState } from "react";
import { useTimerContext } from "../context/components/timer-context";

type TimerProps = {
  duration: number;
};

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const { setIsTimeUp } = useTimerContext(); // Use context to update the shared state
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60);
  const [isTimeCritical, setIsTimeCritical] = useState<boolean>(false);

  const startTimer = (initialTime: number) => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);  // Clear interval when time reaches 0
          
          setIsTimeUp(true);  // Update shared state when time is up
          return 0;  // Set timeLeft to 0
        }

        const updatedTime = prevTime - 1;
        if (updatedTime <= 10) {
          setIsTimeCritical(true); // Critical time (10 seconds)
        } else {
          setIsTimeCritical(false);
        }

        return updatedTime;
      });
    }, 1000); // Interval runs every second

    return interval; // Return the interval ID
  };

  useEffect(() => {
    // Reset the timeLeft when duration changes and start the timer
    setTimeLeft(duration * 60);

    const interval = startTimer(duration * 60); // Start the timer

    // Cleanup the interval when component unmounts or duration changes
    return () => clearInterval(interval);
  }, [duration]); // Run this effect whenever the duration prop changes

  // Format the time into MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`font-normal text-xl ${isTimeCritical ? "text-red-500" : "text-[#11CE19]"}`}>
      {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
    </div>
  );
};

export default Timer;
