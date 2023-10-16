import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Text from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';

import styles from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  isLoading?: boolean;
  className?: string;
  comments?: Comment[];
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, comments } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(styles.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(styles.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            className={styles.comment}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('No comments')} />
      )}
    </div>
  );
});
