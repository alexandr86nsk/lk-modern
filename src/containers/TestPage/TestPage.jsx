import React from 'react';
import './TestPage.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'semantic-ui-react';

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
  hidden: {
    scale: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      when: 'beforeChildren',
    }
  }
}

const item = {
 /* hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },*/
  show: i => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
 hidden: i => ({
    opacity: 0,
    scale: 0,
    transition: {
      delay: 1 - (i * 0.1),
    },
  }),
  exit: {
    scale: 0,
    opacity: 0,
  }
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
  const [hideContainer, setHideContainer] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setArray(arr);
  }, []);

  const handleHide = React.useCallback(() => {
    setHideContainer(!hideContainer);
  }, [hideContainer]);

  console.log('array', array);

  return (
    <div className="test-page page__content">
      <div className="background">
        <AnimatePresence>
        {!hideContainer && <motion.ul
            className="container"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
          <AnimatePresence>
            {array.map(({ id: pId, value: pValue }, index) => (
              <motion.li
                key={pId}
                custom={index}
                className="item"
                variants={item}
                //exit="exit"
                onClick={() => setArray(array.filter(({ id: cId }) => pId !== cId))}
              >
                {pValue}
              </motion.li>
            ))}
            </AnimatePresence>
          </motion.ul>}
        </AnimatePresence>
        <Button positive onClick={handleRefresh}>Обновить</Button>
        <Button negative onClick={handleHide}>Скрыть</Button>
      </div>
    </div>
  );
}

export default TestPage;
