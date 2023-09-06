import { fireEvent, screen } from '@testing-library/react';
import SideBar from './SideBar';
import renderWithTranslation from 'shared/lib/tests/rendreWithTranslation/renderWithTranslation';

describe('SideBar', () => {
  test('should render', () => {
    renderWithTranslation(<SideBar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
  test('should toggle sidebar width button', () => {
    renderWithTranslation(<SideBar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
