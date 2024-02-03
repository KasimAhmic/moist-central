import { GiveawayEntryState, giveawayEntryAdapter, moistCentralEndpoints } from '../apis';

export const useGiveawayEntrySelector = <T extends (entires: GiveawayEntryState) => ReturnType<T>>(
  selectorFn: T,
) => {
  // @ts-expect-error - RTK expects a return type of Record<string, any> but there is no legitimate
  // reason for this. We can safely return whatever we want here.
  return moistCentralEndpoints.findAllGiveawayEntries.useQueryState<ReturnType<T>>(undefined, {
    selectFromResult: (result) => selectorFn(result.data ?? giveawayEntryAdapter.getInitialState()),
  });
};
