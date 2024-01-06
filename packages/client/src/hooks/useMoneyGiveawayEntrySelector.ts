import { EntityState } from '@reduxjs/toolkit';

import { MoneyGiveawayEntity, moistCentralEndpoints, moneyGiveawayAdapter } from '../apis';

export const useMoneyGiveawayEntrySelector = <
  T extends (entires: EntityState<MoneyGiveawayEntity, string>) => ReturnType<T>,
>(
  selectorFn: T,
) => {
  // @ts-expect-error - RTK expects a return type of Record<string, any> but there is no legitimate
  // reason for this. We can safely return whatever we want here.
  return moistCentralEndpoints.findAllMoneyGiveawayEntries.useQueryState<ReturnType<T>>(undefined, {
    selectFromResult: (result) => selectorFn(result.data ?? moneyGiveawayAdapter.getInitialState()),
  });
};
