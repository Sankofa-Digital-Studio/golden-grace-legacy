import React, { useEffect, useState } from 'react';

export const TopProgressBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer1;
    let timer2;
    let timer3;

    if (isLoading) {
      setVisible(true);
      setProgress(25);
      timer1 = setTimeout(() => setProgress(65), 80);
      timer2 = setTimeout(() => setProgress(88), 180);
    } else if (visible) {
      setProgress(100);
      timer3 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isLoading, visible]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page navigation loading"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none overflow-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-300 ease-out shadow-[0_0_14px_rgba(245,158,11,0.9)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TopProgressBar;
