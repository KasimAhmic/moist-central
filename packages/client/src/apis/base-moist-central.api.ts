import { emptyApi as api } from './empty.api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createGiveaway: build.mutation<CreateGiveawayApiResponse, CreateGiveawayApiArg>({
      query: (queryArg) => ({ url: `/api/giveaway`, method: 'POST', body: queryArg }),
    }),
    findAllGiveaways: build.query<FindAllGiveawaysApiResponse, FindAllGiveawaysApiArg>({
      query: () => ({ url: `/api/giveaway` }),
    }),
    removeAllGiveaways: build.mutation<RemoveAllGiveawaysApiResponse, RemoveAllGiveawaysApiArg>({
      query: () => ({ url: `/api/giveaway`, method: 'DELETE' }),
    }),
    findGiveaway: build.query<FindGiveawayApiResponse, FindGiveawayApiArg>({
      query: (queryArg) => ({ url: `/api/giveaway/${queryArg}` }),
    }),
    updateGiveaway: build.mutation<UpdateGiveawayApiResponse, UpdateGiveawayApiArg>({
      query: (queryArg) => ({
        url: `/api/giveaway/${queryArg.giveawayId}`,
        method: 'PUT',
        body: queryArg.updateGiveawayDto,
      }),
    }),
    removeGiveaway: build.mutation<RemoveGiveawayApiResponse, RemoveGiveawayApiArg>({
      query: (queryArg) => ({ url: `/api/giveaway/${queryArg}`, method: 'DELETE' }),
    }),
    enterGiveaway: build.mutation<EnterGiveawayApiResponse, EnterGiveawayApiArg>({
      query: (queryArg) => ({
        url: `/api/giveaway/${queryArg.giveawayId}/entry`,
        method: 'POST',
        body: queryArg.enterGiveawayDto,
      }),
    }),
    findAllGiveawayEntries: build.query<FindAllGiveawayEntriesApiResponse, FindAllGiveawayEntriesApiArg>({
      query: (queryArg) => ({ url: `/api/giveaway/${queryArg}/entry` }),
    }),
    removeAllGiveawayEntries: build.mutation<
      RemoveAllGiveawayEntriesApiResponse,
      RemoveAllGiveawayEntriesApiArg
    >({
      query: (queryArg) => ({ url: `/api/giveaway/${queryArg}/entry`, method: 'DELETE' }),
    }),
    findGiveawayEntry: build.query<FindGiveawayEntryApiResponse, FindGiveawayEntryApiArg>({
      query: (queryArg) => ({ url: `/api/giveaway/entry/${queryArg}` }),
    }),
    removeGiveawayEntry: build.mutation<RemoveGiveawayEntryApiResponse, RemoveGiveawayEntryApiArg>({
      query: (queryArg) => ({ url: `/api/giveaway/entry/${queryArg}`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as baseMoistCentralApi };
export type CreateGiveawayApiResponse = /** status 201  */ Giveaway;
export type CreateGiveawayApiArg = CreateGiveawayDto;
export type FindAllGiveawaysApiResponse = /** status 200  */ Giveaway[];
export type FindAllGiveawaysApiArg = void;
export type RemoveAllGiveawaysApiResponse = unknown;
export type RemoveAllGiveawaysApiArg = void;
export type FindGiveawayApiResponse = /** status 200  */ Giveaway;
export type FindGiveawayApiArg = number;
export type UpdateGiveawayApiResponse = /** status 200  */ Giveaway;
export type UpdateGiveawayApiArg = {
  giveawayId: number;
  updateGiveawayDto: UpdateGiveawayDto;
};
export type RemoveGiveawayApiResponse = unknown;
export type RemoveGiveawayApiArg = number;
export type EnterGiveawayApiResponse = /** status 201  */ GiveawayEntry;
export type EnterGiveawayApiArg = {
  giveawayId: number;
  enterGiveawayDto: EnterGiveawayDto;
};
export type FindAllGiveawayEntriesApiResponse = /** status 200  */ GiveawayEntry[];
export type FindAllGiveawayEntriesApiArg = number;
export type RemoveAllGiveawayEntriesApiResponse = unknown;
export type RemoveAllGiveawayEntriesApiArg = number;
export type FindGiveawayEntryApiResponse = /** status 200  */ GiveawayEntry;
export type FindGiveawayEntryApiArg = number;
export type RemoveGiveawayEntryApiResponse = unknown;
export type RemoveGiveawayEntryApiArg = number;
export type Giveaway = {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  type: string;
  open: boolean;
  minimumAmount: number;
  maximumAmount: number | null;
  items: string[] | null;
};
export type CreateGiveawayDto = {
  type: Type;
  name: string;
  open: boolean;
  minimumAmount: number | null;
  maximumAmount: number | null;
  items: string[] | null;
};
export type UpdateGiveawayDto = {
  type?: Type;
  name?: string;
  open?: boolean;
  minimumAmount?: number | null;
  maximumAmount?: number | null;
  items?: string[] | null;
};
export type GiveawayEntry = {
  createdOn: number;
  updatedOn: number;
  id: number;
  giveawayId: number;
  item: string | null;
  amount: number | null;
  description: string | null;
  platform: string;
  name: string;
  email: string;
};
export type EnterGiveawayDto = {
  amount: number | null;
  item: string | null;
  platform: string;
  name: string;
  description: string | null;
  email: string;
};
export enum Type {
  Item = 'item',
  Money = 'money',
}
export const {
  useCreateGiveawayMutation,
  useFindAllGiveawaysQuery,
  useRemoveAllGiveawaysMutation,
  useFindGiveawayQuery,
  useUpdateGiveawayMutation,
  useRemoveGiveawayMutation,
  useEnterGiveawayMutation,
  useFindAllGiveawayEntriesQuery,
  useRemoveAllGiveawayEntriesMutation,
  useFindGiveawayEntryQuery,
  useRemoveGiveawayEntryMutation,
} = injectedRtkApi;
