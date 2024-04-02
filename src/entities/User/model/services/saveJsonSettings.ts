import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getUserJsonSettings } from '../selectors/getUserJsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;
  const userData = getUserAuthData(getState());
  const currentSettings = getUserJsonSettings(getState());

  if (!userData) {
    return rejectWithValue('error');
  }

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: { ...currentSettings, ...newJsonSettings },
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue('error');
    }

    return response.jsonSettings;
  } catch (err) {
    return rejectWithValue('error');
  }
});
