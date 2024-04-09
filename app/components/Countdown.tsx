"use client";

import { useEffect, useState } from "react";

interface Props {
  refreshTime: number;
  updateFunc: () => void;
}
const Countdown = ({ refreshTime, updateFunc }: Props) => {
  const [startTime, setStartTime] = useState<Date>(
    new Date(refreshTime * 1000),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStartTime((prev) => new Date(prev.valueOf() - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    if (startTime.getTime() / 1000 === 0) {
      updateFunc();
      setStartTime(new Date(refreshTime * 30 * 1000));
    }
  };

  useEffect(() => {
    handleRefresh();
  }, [startTime]);

  return (
    <div className="mt-4 flex items-center justify-center gap-6 rounded-md border border-slate-200 bg-secondary p-3 text-white">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="rounded-md bg-primary px-3 py-4 font-mono text-2xl font-bold">
          {startTime.getUTCHours() > 9
            ? startTime.getUTCHours()
            : "0" + startTime.getUTCHours()}
        </span>
        <span className="text-lg">ساعت</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="rounded-md bg-primary px-3 py-4 font-mono text-2xl font-bold">
          {startTime.getUTCMinutes() > 9
            ? startTime.getUTCMinutes()
            : "0" + startTime.getUTCMinutes()}
        </span>
        <span className="text-lg">دقیقه</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="rounded-md bg-primary px-3 py-4 font-mono text-2xl font-bold">
          {startTime.getUTCSeconds() > 9
            ? startTime.getUTCSeconds()
            : "0" + startTime.getUTCSeconds()}
        </span>
        <span className="text-lg">ثانیه</span>
      </div>
    </div>
  );
};

export default Countdown;
