import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getRouteArticleDetails } from '@/shared/const/router';
import {
  AppImage,
  HStack,
  TextRedesigned,
  CardRedesigned,
  AvatarRedesigned,
  ButtonRedesigned,
  AppLinkRedesigned,
  SkeletonRedesigned,
  VStack,
  Icon,
} from '@/shared/ui';

import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/article';
import {
  ArticleListView,
  ArticleBlockType,
} from '../../../model/consts/consts';

import styles from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const userInfo = (
    <>
      <AvatarRedesigned size={32} src={article.user.avatar} />
      <TextRedesigned text={article.user.username} bold />
    </>
  );

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <TextRedesigned
        text={article.views.toString()}
        className={styles.views}
      />
    </HStack>
  );

  if (view === ArticleListView.BIG) {
    const textBlock = article.blocks.find(
      (article) => article.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <CardRedesigned
        className={classNames('', {}, [className, styles[view]])}
        cardPadding="24"
        data-testid="ArticleListItem"
        max
      >
        <VStack gap="16">
          <HStack gap="8" max>
            {userInfo}
            <TextRedesigned text={article.createdAt} className={styles.date} />
          </HStack>
          <TextRedesigned title={article.title} bold />
          <TextRedesigned title={article.subtitle} size="s" />
          <AppImage
            src={article.img}
            className={styles.img}
            alt={article.title}
            fallback={<SkeletonRedesigned width="100%" height={420} />}
          />
          {textBlock && (
            <TextRedesigned
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
              className={styles.textBlock}
            />
          )}
          <HStack max justify="between">
            <AppLinkRedesigned
              to={getRouteArticleDetails(article.id)}
              target={target}
            >
              <ButtonRedesigned variant="outline">
                {t('Читать далее...')}
              </ButtonRedesigned>
            </AppLinkRedesigned>
            {views}
          </HStack>
        </VStack>
      </CardRedesigned>
    );
  }

  return (
    <AppLinkRedesigned
      className={classNames('', {}, [className, styles[view]])}
      to={getRouteArticleDetails(article.id)}
      target={target}
      data-testid="ArticleListItem"
    >
      <CardRedesigned className={styles.card}>
        <AppImage
          src={article.img}
          alt={article.title}
          className={styles.img}
          fallback={<SkeletonRedesigned width="100%" height={200} border="6" />}
        />
        <VStack gap="4" className={styles.info}>
          <TextRedesigned text={article.title} className={styles.title} />
          <VStack gap="4" className={styles.footer} max>
            <HStack justify="between" max>
              <TextRedesigned
                text={article.createdAt}
                className={styles.date}
              />
              {views}
            </HStack>
            <HStack gap="8" max>
              {userInfo}
            </HStack>
          </VStack>
        </VStack>
      </CardRedesigned>
    </AppLinkRedesigned>
  );
};
