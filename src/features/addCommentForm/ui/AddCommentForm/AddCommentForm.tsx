import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import DynamicModuleLoader, {
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import {
  addNewCommentFormActions,
  addNewCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import styles from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  onSendComment: (text: string) => void;
  className?: string;
}

const reducers: ReducerList = {
  addCommentForm: addNewCommentFormReducer,
};

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation('article-details');
    const text = useSelector(getAddCommentFormText);
    const dispatch = useAppDispatch();

    const handleCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addNewCommentFormActions.setText(value));
      },
      [dispatch]
    );

    const handleSendComment = useCallback(() => {
      onSendComment(text);
      handleCommentTextChange('');
    }, [handleCommentTextChange, onSendComment, text]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          justify="between"
          max
          className={classNames(styles.AddCommentForm, {}, [className])}
        >
          <Input
            className={styles.input}
            placeholder={t('Add new comment')}
            value={text}
            onChange={handleCommentTextChange}
          />
          <Button onClick={handleSendComment}>{t('Send')}</Button>
        </HStack>
      </DynamicModuleLoader>
    );
  }
);

export default AddCommentForm;
