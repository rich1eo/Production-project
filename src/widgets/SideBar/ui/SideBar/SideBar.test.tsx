import { fireEvent, screen } from '@testing-library/react';
import SideBar from './SideBar';
import componentRender from 'shared/lib/tests/componentRender/componentRender';

describe('SideBar', () => {
  test('should render', () => {
    componentRender(<SideBar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('should toggle sidebar width button', () => {
    componentRender(<SideBar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
