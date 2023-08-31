import { useState } from 'react';

import styles from './Counter.module.scss';

export function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <article>
      <div className={styles.counter}>
        <button
          className={styles.btn}
          onClick={() => setCounter(state => --state)}
        >
          -
        </button>
        <span>{counter}</span>
        <button
          className={styles.btn}
          onClick={() => setCounter(state => ++state)}
        >
          +
        </button>
      </div>
      {counter < 0 && (
        <p className={styles['counter-negative']}>Отрицательное значение</p>
      )}
      {counter > 0 && (
        <p className={styles['counter-positive']}>Положительное значение</p>
      )}
    </article>
  );
}
