import React, { useState, useEffect } from 'react';

function ReverseCounter({ targetTime }) {
  let [timeLeft, setTimeLeft] = useState('Time has not started yet.');
  
  useEffect(() => {
    let intervalId = setInterval(() => {
      let now = new Date();
      let [targetHour, targetMinute] = targetTime.split(' ')[0].split(':').map(Number);
      targetHour = targetHour % 12 + (targetTime.split(' ')[1] === 'PM' ? 12 : 0);
      let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute);
      let timeDiff = targetDate - now;
      
      if (timeDiff < 0) {
        clearInterval(intervalId);
        setTimeLeft('Time has expired.');
      } else {
        setTimeLeft(Math.floor(timeDiff / 1000 / 60) + ' : ' + Math.floor((timeDiff / 1000) % 60) + ' min');
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [targetTime]);
  
  return (
      <span className="ml-2">{timeLeft}</span>
  );
}

export default ReverseCounter;
