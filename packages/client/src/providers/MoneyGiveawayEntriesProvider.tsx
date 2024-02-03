import { FC } from 'react';

import { useFindAllGiveawayEntriesQuery } from '../apis';

export const MoneyGiveawayEntriesProvider: FC = () => {
  useFindAllGiveawayEntriesQuery(3);

  return null;
};
