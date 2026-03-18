import { useEffect, useState } from "react";

export const useCountUp = (end: number, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      setValue(Math.floor(progress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId); // ✅ cleanup
  }, [end, duration]);

  return value;
};
