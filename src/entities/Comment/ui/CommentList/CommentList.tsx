import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Text, VStack } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames/classNames';

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
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <Text text={t('No comments')} />
      )}
    </VStack>
  );
});
