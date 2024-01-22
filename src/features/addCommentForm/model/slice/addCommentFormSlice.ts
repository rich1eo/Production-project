import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
  isLoading: false,
  text: '',
  error: '',
};

export const addCommentFormSlice = createSlice({
  name: 'addNewCommentForm',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { actions: addNewCommentFormActions } = addCommentFormSlice;
export const { reducer: addNewCommentFormReducer } = addCommentFormSlice;
