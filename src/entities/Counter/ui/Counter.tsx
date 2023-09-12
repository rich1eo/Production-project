import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export default function Counter() {
  const dispath = useDispatch();
  const value = useSelector(getCounterValue);

  function increament() {
    dispath(counterActions.increment());
  }

  function decrement() {
    dispath(counterActions.decrement());
  }

  return (
    <div>
      <button data-testid="decrement-btn" onClick={decrement}>
        -
      </button>
      <span data-testid="counter-value">{value}</span>
      <button onClick={increament} data-testid="increment-btn">
        +
      </button>
    </div>
  );
}
