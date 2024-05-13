import { screen } from '@testing-library/react';
import SideBar from './SideBar';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';

describe('SideBar', () => {
  test('should render', () => {
    componentRender(<SideBar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
});
