import React, { useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'motion/react';

interface NumberAnimationProps {
  n: number;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({ n }) => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <motion.div 
      onViewportEnter={() => setCounterOn(true)}
      onViewportLeave={() => setCounterOn(false)}
      viewport={{ amount: 0.5 }}
    >
      <span>{counterOn && <CountUp start={0} end={n} duration={3} delay={0} separator="," />}</span>
    </motion.div>
  );
};

export default NumberAnimation;
