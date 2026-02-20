"use client";

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface Props {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<Props> = ({ end, duration = 2, prefix = "", suffix = "" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // فقط یکبار وقتی دیده شد اجرا شود
    threshold: 0.1,    // وقتی ۱۰٪ المان دیده شد شروع کن
  });

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          separator="" // جداکننده هزارگان
        />
      ) : (
        // نمایش عدد ثابت قبل از دیده شدن (برای سئو و پایداری لایه)
        `${prefix}${end}${suffix}`
      )}
    </span>
  );
};

export default AnimatedCounter;