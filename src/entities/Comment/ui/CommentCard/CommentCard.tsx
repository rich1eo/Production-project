import { memo } from 'react';

import { classNames } from '@/shared/lib';
import {
  Avatar,
  Text,
  Skeleton as SkeletonDeprecated,
  AppLink,
  VStack,
  SkeletonRedesigned,
  AppLinkRedesigned,
  AvatarRedesigned,
  TextRedesigned,
  CardRedesigned,
} from '@/shared/ui';
import { getRouteProfile } from '@/shared/const/router';

import { Comment } from '../../model/types/comment';

import * as styles from './CommentCard.module.scss';
import { ToggleFeature, toggleFeature } from '@/shared/lib/features';

interface CommentCardProps {
  comment?: Comment;
  className?: string;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, isLoading, comment } = props;

  const Skeleton = toggleFeature({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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
          <Skeleton width={30} height={30} border="50%" />
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
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <CardRedesigned cardPadding="24" max>
          <VStack
            gap="8"
            max
            className={classNames(styles.CommentCardRedesigned, {}, [
              className,
            ])}
            data-testid="CommentCard.content"
          >
            <AppLinkRedesigned
              to={getRouteProfile(comment.user.id)}
              className={styles.header}
            >
              {comment.user.avatar && (
                <AvatarRedesigned src={comment.user.avatar} size={30} />
              )}
              <TextRedesigned
                className={styles.username}
                text={comment.user.username}
                bold
              />
            </AppLinkRedesigned>
            <TextRedesigned className={styles.text} text={comment.text} />
          </VStack>
        </CardRedesigned>
      }
      off={
        <VStack
          gap="8"
          max
          className={classNames(styles.CommentCard, {}, [className])}
          data-testid="CommentCard.content"
        >
          <AppLink
            to={getRouteProfile(comment.user.id)}
            className={styles.header}
          >
            {comment.user.avatar && (
              <Avatar src={comment.user.avatar} size={30} />
            )}
            <Text className={styles.username} text={comment.user.username} />
          </AppLink>
          <Text className={styles.text} text={comment.text} />
        </VStack>
      }
    />
  );
});
