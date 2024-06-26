import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button,
  Input,
  HStack,
  InputRedesigned,
  ButtonRedesigned,
  CardRedesigned,
} from '@/shared/ui';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import {
  addNewCommentFormActions,
  addNewCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import * as styles from './AddCommentForm.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

export interface AddCommentFormProps {
  onSendComment: (text: string) => void;
  className?: string;
}

const reducers: ReducerList = {
  addCommentForm: addNewCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation('article-details');
  const text = useSelector(getAddCommentFormText);
  const dispatch = useAppDispatch();

  const handleCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const handleSendComment = useCallback(() => {
    onSendComment(text);
    handleCommentTextChange('');
  }, [handleCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <CardRedesigned cardPadding="24" max>
            <HStack
              justify="between"
              gap="16"
              max
              className={classNames(styles.AddCommentFormRedesigned, {}, [
                className,
              ])}
              data-testid="AddCommentForm"
            >
              <InputRedesigned
                className={styles.input}
                placeholder={t('Add new comment')}
                value={text}
                onChange={handleCommentTextChange}
                data-testid="AddCommentForm.input"
              />
              <ButtonRedesigned
                onClick={handleSendComment}
                data-testid="AddCommentForm.btn"
              >
                {t('Send')}
              </ButtonRedesigned>
            </HStack>
          </CardRedesigned>
        }
        off={
          <HStack
            justify="between"
            max
            className={classNames(styles.AddCommentForm, {}, [className])}
            data-testid="AddCommentForm"
          >
            <Input
              className={styles.input}
              placeholder={t('Add new comment')}
              value={text}
              onChange={handleCommentTextChange}
              data-testid="AddCommentForm.input"
            />
            <Button
              onClick={handleSendComment}
              data-testid="AddCommentForm.btn"
            >
              {t('Send')}
            </Button>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
