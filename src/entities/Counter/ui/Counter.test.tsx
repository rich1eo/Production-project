import componentRender from 'shared/lib/tests/componentRender/componentRender';
import Counter from './Counter';
import { fireEvent, screen } from '@testing-library/react';

describe('Counter', () => {
  test('should render', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');
  });

  test('should decrement counter', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');

    fireEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('9');
  });

  test('should increment counter', () => {
    componentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');

    fireEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('11');
  });
});
