import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { moistCentralMiddleware, moistCentralReducer, moistCentralReducerPath } from './apis';

export const store = configureStore({
  reducer: {
    [moistCentralReducerPath]: moistCentralReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moistCentralMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
