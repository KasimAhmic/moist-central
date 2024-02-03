import { createEntityAdapter } from '@reduxjs/toolkit';
import { DefinitionsFromApi, OverrideResultType } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { EntityStateFromAdapter } from '../@types/adapter-state';
import {
  FindAllGiveawayEntriesApiResponse,
  FindAllGiveawaysApiResponse,
  Giveaway,
  GiveawayEntry,
  baseMoistCentralApi,
} from './base-moist-central.api';

const tags = ['giveaway', 'giveaway-entry'] as const;

export const giveawayAdapter = createEntityAdapter<Giveaway, Giveaway['id']>({
  selectId: (entity) => entity.id,
  sortComparer: (a, b) => a.createdOn - b.createdOn,
});

export const giveawayEntryAdapter = createEntityAdapter<GiveawayEntry, GiveawayEntry['id']>({
  selectId: (entity) => entity.id,
  sortComparer: (a, b) => a.createdOn - b.createdOn,
});

export const moistCentralApi = baseMoistCentralApi.enhanceEndpoints<TagTypes, UpdatedDefinitions>({
  addTagTypes: tags,
  endpoints: {
    createGiveaway: {
      invalidatesTags: ['giveaway'],
    },
    findAllGiveaways: {
      providesTags: ['giveaway'],
      transformResponse: (response: FindAllGiveawaysApiResponse) =>
        giveawayAdapter.setAll(giveawayAdapter.getInitialState(), response),
    },
    removeAllGiveaways: {
      invalidatesTags: ['giveaway'],
    },
    findGiveaway: {
      providesTags: ['giveaway'],
    },
    updateGiveaway: {
      invalidatesTags: ['giveaway'],
    },
    removeGiveaway: {
      invalidatesTags: ['giveaway'],
    },
    findAllGiveawayEntries: {
      providesTags: ['giveaway-entry'],
      transformResponse: (response: FindAllGiveawayEntriesApiResponse) =>
        giveawayEntryAdapter.setAll(giveawayEntryAdapter.getInitialState(), response),
    },
    findGiveawayEntry: {
      providesTags: ['giveaway-entry'],
    },
    removeGiveawayEntry: {
      invalidatesTags: ['giveaway-entry'],
    },
    removeAllGiveawayEntries: {
      invalidatesTags: ['giveaway-entry'],
    },
  },
});

export const {
  reducerPath: moistCentralReducerPath,
  reducer: moistCentralReducer,
  endpoints: moistCentralEndpoints,
  middleware: moistCentralMiddleware,
} = moistCentralApi;

export const giveawaySelectors = giveawayAdapter.getSelectors();
export const giveawayEntrySelectors = giveawayEntryAdapter.getSelectors();

export type GiveawayState = EntityStateFromAdapter<typeof giveawayAdapter>;
export type GiveawayEntryState = EntityStateFromAdapter<typeof giveawayEntryAdapter>;

type Definitions = DefinitionsFromApi<typeof baseMoistCentralApi>;
type TagTypes = (typeof tags)[number];

type UpdatedFindAllGiveawaysDef = OverrideResultType<Definitions['findAllGiveaways'], GiveawayState>;

type UpdatedFindAllGiveawayEntriesDef = OverrideResultType<
  Definitions['findAllGiveawayEntries'],
  GiveawayEntryState
>;

type UpdatedDefinitions = Omit<Definitions, 'findAllGiveawayEntries' | 'findAllGiveaways'> & {
  findAllGiveaways: UpdatedFindAllGiveawaysDef;
  findAllGiveawayEntries: UpdatedFindAllGiveawayEntriesDef;
};
