import { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/store';
import {
  LOCAL_STORAGE_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { User, UserSchema } from '../types/user';
import { JsonSettings } from '../types/jsonSettings';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = buildSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      setFeatureFlags(payload.features);
      localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
      localStorage.setItem(
        LOCAL_STORAGE_DESIGN_KEY,
        payload.features?.isAppRedesigned ? 'new' : 'old',
      );
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, action: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload;
        }
      },
    );
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        setFeatureFlags(payload.features);
        state._inited = true;
      },
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
    builder.addCase(saveJsonSettings.rejected, (state) => {
      state._inited = true;
    });
  },
});

export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUserActions,
} = userSlice;
