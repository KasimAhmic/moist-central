import { FC, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import { PageRoute } from '../hooks';

const HomeView = lazy(() => import('./HomeView'));
const GiveawayView = lazy(() => import('./GiveawayView'));

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  entries: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

export const MainView: FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Routes>
        <Route path={PageRoute.Home} element={<HomeView />} />
        <Route path={PageRoute.Giveaways} element={<GiveawayView />} />
      </Routes>
    </div>
  );
};
