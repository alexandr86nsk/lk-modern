import React from 'react';
import './TestPage.scss';
import { motion } from 'framer-motion';

/*const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};*/

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const arr = [
  { id: 0, value: '0' },
  { id: 1, value: '1' },
  { id: 2, value: '2' },
  { id: 3, value: '3' },
  { id: 4, value: '4' },
  { id: 5, value: '5' },
  { id: 6, value: '6' },
  { id: 7, value: '7' },
];

function TestPage() {
  const [array, setArray] = React.useState(arr);

  return (
    <div className="test-page page__content">
      <div className="background">
        <motion.ul
          className="container"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {array.map((v) => (
            <motion.li
              key={v.id}
              className="item"
              variants={item}
              onClick={() => setArray(array.filter((w) => w.id !== v.id))}
            >
              {v.value}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export default TestPage;
