import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { DefinitionsFromApi, OverrideResultType } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import {
  FindAllMoneyGiveawayEntriesApiResponse,
  MoneyGiveawayEntity,
  baseMoistCentralApi,
} from './base-moist-central.api';

const tags = ['money-giveaway'] as const;

export const moneyGiveawayAdapter = createEntityAdapter<MoneyGiveawayEntity, string>({
  selectId: (entity) => entity.id,
  sortComparer: (a, b) => a.createdOn - b.createdOn,
});

export const moistCentralApi = baseMoistCentralApi.enhanceEndpoints<TagTypes, UpdatedDefinitions>({
  addTagTypes: ['money-giveaway'],
  endpoints: {
    submitMoneyGiveawayEntry: {
      invalidatesTags: ['money-giveaway'],
    },
    findAllMoneyGiveawayEntries: {
      providesTags: ['money-giveaway'],
      transformResponse: (response: FindAllMoneyGiveawayEntriesApiResponse) =>
        moneyGiveawayAdapter.setAll(moneyGiveawayAdapter.getInitialState(), response),
    },
    findMoneyGiveawayEntry: {
      providesTags: ['money-giveaway'],
    },
    removeMoneyGiveawayEntry: {
      invalidatesTags: ['money-giveaway'],
    },
    removeAllMoneyGiveawayEntries: {
      invalidatesTags: ['money-giveaway'],
    },
  },
});

export const {
  reducerPath: moistCentralReducerPath,
  reducer: moistCentralReducer,
  endpoints: moistCentralEndpoints,
  middleware: moistCentralMiddleware,
} = moistCentralApi;

export const moneyGiveawaySelectors = moneyGiveawayAdapter.getSelectors();

type Definitions = DefinitionsFromApi<typeof baseMoistCentralApi>;
type TagTypes = (typeof tags)[number];

type UpdatedFindAllMoneyGiveawayEntriesDef = OverrideResultType<
  Definitions['findAllMoneyGiveawayEntries'],
  EntityState<MoneyGiveawayEntity, string>
>;

type UpdatedDefinitions = Omit<Definitions, 'findAllMoneyGiveawayEntries'> & {
  findAllMoneyGiveawayEntries: UpdatedFindAllMoneyGiveawayEntriesDef;
};
