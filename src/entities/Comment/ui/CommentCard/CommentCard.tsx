import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Avatar, Text, Skeleton, AppLink, VStack } from '@/shared/ui';
import { getRouteProfile } from '@/shared/const/router';

import { Comment } from '../../model/types/comment';

import styles from './CommentCard.module.scss';

interface CommentCardProps {
  comment?: Comment;
  className?: string;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, isLoading, comment } = props;

  if (isLoading) {
    return (
      <VStack
        className={classNames(styles.CommentCard, {}, [
          className,
          styles.loading,
        ])}
        max
        gap="8"
        data-testid="CommentCard.loading"
      >
        <div className={styles.header}>
          <Skeleton
            className={styles.avatar}
            width={30}
            height={30}
            border="50%"
          />
          <Skeleton className={styles.username} height={16} width={100} />
        </div>
        <Skeleton className={styles.text} width="100%" height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack
      gap="8"
      max
      className={classNames(styles.CommentCard, {}, [className])}
      data-testid="CommentCard.content"
    >
      <AppLink to={getRouteProfile(comment.user.id)} className={styles.header}>
        {comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
        <Text className={styles.username} text={comment.user.username} />
      </AppLink>
      <Text className={styles.text} text={comment.text} />
    </VStack>
  );
});
