import { FC } from 'react';

import { useFindAllMoneyGiveawayEntriesQuery } from '../apis';

export const MoneyGiveawayEntriesProvider: FC = () => {
  useFindAllMoneyGiveawayEntriesQuery();

  return null;
};
