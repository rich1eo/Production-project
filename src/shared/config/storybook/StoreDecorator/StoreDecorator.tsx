/* eslint-disable indent */
import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { addNewCommentFormReducer } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { loginReducer } from 'features/authByUsername/model/slice/loginSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducerList = {
  loginFrom: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addNewCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) =>
  (StoryComponent: Story) => {
    return (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );
  };
