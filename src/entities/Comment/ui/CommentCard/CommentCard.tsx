import { memo } from 'react';
import styles from './CommentCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import Avatar from 'shared/ui/Avatar/Avatar';
import Text from 'shared/ui/Text/Text';
import Skeleton from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface CommentCardProps {
  comment?: Comment;
  className?: string;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, isLoading, comment } = props;

  if (isLoading) {
    return (
      <div
        className={classNames(styles.CommentCard, {}, [
          className,
          styles.loading,
        ])}
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
      </div>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <div className={classNames(styles.CommentCard, {}, [className])}>
      <AppLink
        to={`${RoutePath.profile}${comment.user.id}`}
        className={styles.header}
      >
        {comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
        <Text className={styles.username} text={comment.user.username} />
      </AppLink>
      <Text className={styles.text} text={comment.text} />
    </div>
  );
});
