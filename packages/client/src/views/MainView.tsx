import { FC } from 'react';

import { Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { moneyGiveawaySelectors } from '../apis';
import { useMoneyGiveawayEntrySelector } from '../hooks';
import { MoneyGiveawayEntriesProvider } from '../providers';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Entry: FC<{ id: string }> = ({ id }) => {
  const entry = useMoneyGiveawayEntrySelector((entries) => moneyGiveawaySelectors.selectById(entries, id));

  return (
    <Paper>
      <Typography>{entry.id}</Typography>
      <Typography>{formatter.format(entry.amount)}</Typography>
      <Typography>{entry.paypalEmail}</Typography>
      <Typography>{entry.platform}</Typography>
      <Typography>{entry.username}</Typography>
      <Typography>{new Date(entry.createdOn).toLocaleString()}</Typography>
    </Paper>
  );
};

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

const MainView: FC = () => {
  const { classes } = useStyles();

  const ids = useMoneyGiveawayEntrySelector((entries) => moneyGiveawaySelectors.selectIds(entries));

  return (
    <div className={classes.root}>
      <MoneyGiveawayEntriesProvider />

      <div className={classes.entries}>
        {ids.map((id) => (
          <Entry key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default MainView;
