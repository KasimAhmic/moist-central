import { emptyApi as api } from './empty.api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitMoneyGiveawayEntry: build.mutation<
      SubmitMoneyGiveawayEntryApiResponse,
      SubmitMoneyGiveawayEntryApiArg
    >({
      query: (queryArg) => ({ url: `/api/money-giveaway`, method: 'POST', body: queryArg }),
    }),
    findAllMoneyGiveawayEntries: build.query<
      FindAllMoneyGiveawayEntriesApiResponse,
      FindAllMoneyGiveawayEntriesApiArg
    >({
      query: () => ({ url: `/api/money-giveaway` }),
    }),
    removeAllMoneyGiveawayEntries: build.mutation<
      RemoveAllMoneyGiveawayEntriesApiResponse,
      RemoveAllMoneyGiveawayEntriesApiArg
    >({
      query: () => ({ url: `/api/money-giveaway`, method: 'DELETE' }),
    }),
    findMoneyGiveawayEntry: build.query<FindMoneyGiveawayEntryApiResponse, FindMoneyGiveawayEntryApiArg>({
      query: (queryArg) => ({ url: `/api/money-giveaway/${queryArg}` }),
    }),
    removeMoneyGiveawayEntry: build.mutation<
      RemoveMoneyGiveawayEntryApiResponse,
      RemoveMoneyGiveawayEntryApiArg
    >({
      query: (queryArg) => ({ url: `/api/money-giveaway/${queryArg}`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseMoistCentralApi };
export type SubmitMoneyGiveawayEntryApiResponse = /** status 201  */ MoneyGiveawayEntity;
export type SubmitMoneyGiveawayEntryApiArg = MoneyGiveawayDto;
export type FindAllMoneyGiveawayEntriesApiResponse = /** status 200  */ MoneyGiveawayEntity[];
export type FindAllMoneyGiveawayEntriesApiArg = void;
export type RemoveAllMoneyGiveawayEntriesApiResponse = unknown;
export type RemoveAllMoneyGiveawayEntriesApiArg = void;
export type FindMoneyGiveawayEntryApiResponse = /** status 200  */ MoneyGiveawayEntity;
export type FindMoneyGiveawayEntryApiArg = string;
export type RemoveMoneyGiveawayEntryApiResponse = unknown;
export type RemoveMoneyGiveawayEntryApiArg = string;
export type MoneyGiveawayEntity = {
  id: string;
  amount: number;
  platform: string;
  username: string;
  description: string;
  paypalEmail: string;
  createdOn: number;
};
export type MoneyGiveawayDto = {
  amount: number;
  platform: string;
  username: string;
  description: string;
  paypalEmail: string;
};
export const {
  useSubmitMoneyGiveawayEntryMutation,
  useFindAllMoneyGiveawayEntriesQuery,
  useRemoveAllMoneyGiveawayEntriesMutation,
  useFindMoneyGiveawayEntryQuery,
  useRemoveMoneyGiveawayEntryMutation,
} = injectedRtkApi;
