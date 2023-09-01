import { Link } from 'react-router-dom';

import 'app/styles/index.scss';

import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <AppRouter />
    </div>
  );
}
