import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './AddCommentForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  addNewCommentFormActions,
  addNewCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import DynamicModuleLoader, {
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

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
    const error = useSelector(getAddCommentFormError);
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
        <div className={classNames(styles.AddCommentForm, {}, [className])}>
          <Input
            className={styles.input}
            placeholder={t('Add new comment')}
            value={text}
            onChange={handleCommentTextChange}
          />
          <Button onClick={handleSendComment}>{t('Send')}</Button>
        </div>
      </DynamicModuleLoader>
    );
  }
);

export default AddCommentForm;
