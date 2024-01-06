import { FC, lazy } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import './index.css';
import { theme } from './theme';

const MainView = lazy(() => import('./views/MainView'));

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MainView />
    </ThemeProvider>
  );
};
