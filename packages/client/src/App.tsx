import { FC } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { theme } from './theme';
import { MainView } from './views/MainView';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <MainView />
      </ThemeProvider>
    </BrowserRouter>
  );
};
