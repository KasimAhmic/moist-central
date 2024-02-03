import { EntityAdapter, EntityState } from '@reduxjs/toolkit';

export type EntityStateFromAdapter<
  Adapter extends EntityAdapter<Entity, Id>,
  Entity = ReturnType<ReturnType<Adapter['getSelectors']>['selectById']>,
  Id extends string | number = ReturnType<Adapter['selectId']>,
> = EntityState<Entity, Id>;

export type EntityId<
  State extends EntityState<Entity, Id>,
  Id extends string | number = State['ids'][number],
  Entity = State['entities'][Id],
> = Id;
