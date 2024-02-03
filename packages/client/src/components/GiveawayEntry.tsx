import { FC } from 'react';

import { Paper, Typography } from '@mui/material';

import { EntityId } from '../@types/adapter-state';
import { GiveawayEntryState, giveawayEntrySelectors } from '../apis';
import { useGiveawayEntrySelector } from '../hooks';

interface GiveawayEntryProps {
  entryId: EntityId<GiveawayEntryState>;
}

export const GiveawayEntry: FC<GiveawayEntryProps> = ({ entryId }) => {
  const entry = useGiveawayEntrySelector((entries) => giveawayEntrySelectors.selectById(entries, entryId));

  return (
    <Paper>
      <Typography variant='h6'>{entry?.name}</Typography>
    </Paper>
  );
};
