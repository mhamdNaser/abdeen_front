// src/hooks/useTimeDate.js
import { useState, useEffect } from "react";

const useTimeDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return date;
};

export default useTimeDate;
