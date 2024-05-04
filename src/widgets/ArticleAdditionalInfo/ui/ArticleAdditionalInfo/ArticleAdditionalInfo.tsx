import { useTranslation } from 'react-i18next';

import { User } from '@/entities/User';
import {
  AvatarRedesigned,
  ButtonRedesigned,
  HStack,
  TextRedesigned,
  VStack,
} from '@/shared/ui';

type ArticleAdditionalInfoProps = {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
};

export const ArticleAdditionalInfo = (props: ArticleAdditionalInfoProps) => {
  const { className, author, createdAt, views, onEdit } = props;
  const { t } = useTranslation('article-details');

  return (
    <VStack gap="32" className={className}>
      <HStack gap="8">
        <AvatarRedesigned src={author.avatar} size={32} />
        <TextRedesigned text={author.username} bold />
        <TextRedesigned text={createdAt} />
      </HStack>
      <ButtonRedesigned onClick={onEdit}>{t('edit.btn')}</ButtonRedesigned>
      <TextRedesigned text={t('article.views', { count: views })} />
    </VStack>
  );
};
