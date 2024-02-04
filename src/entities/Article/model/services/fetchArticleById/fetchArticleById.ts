import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>('profile/fetchArticleById', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  if (!articleId) {
    rejectWithValue('Страница не найдена');
  }

  try {
    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: { _expand: 'user' },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (err) {
    return rejectWithValue('error');
  }
});
