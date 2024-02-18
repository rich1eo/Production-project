import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { Profile } from '@/entities/Profile';
import { ValidationProfileError } from '../../consts/consts';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidationProfileError[]>
>('profile/updateProfileData', async (_, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI;

  const formData = getProfileForm(getState());
  const errors = validateProfileData(formData);

  if (errors.length) {
    return rejectWithValue(errors);
  }

  try {
    const response = await extra.api.put<Profile>(
      '/profile/' + formData?.id,
      formData
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (err) {
    return rejectWithValue([ValidationProfileError.SERVER_ERROR]);
  }
});
